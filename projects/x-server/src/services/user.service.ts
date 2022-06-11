import shortUUID from "short-uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DbProjectService } from "../database/db.project.service";
import { DbUserService } from "../database/db.user.service";
import { RegisterUserDTO, UserPlatformVO } from "src/database/modal/user";
import { ProjectVO } from "../database/modal/project";

@Injectable()
export class UserService {
  constructor(
    private readonly dbProjectService: DbProjectService,
    private readonly dbUserService: DbUserService
  ) {}
  private readonly logger = new Logger();

  // 生成 uid，保证全局唯一
  private async generateUid() {
    let uid = shortUUID().generate();
    while (await this.dbUserService.isUidExists(uid)) {
      uid = shortUUID().generate();
    }
    return uid;
  }

  // 使用内部 uid 获取用户数据
  private async getUserPlatformByUid(uid: string): Promise<UserPlatformVO | null> {
    const userPlatform = await this.dbUserService.findUserPlatformBy({ uid });
    if (!userPlatform) {
      return null;
    }
    const findProjectQueue = userPlatform.projects.map(pid =>
      this.dbProjectService.findProjectBy({ pid })
    );
    const projects = await Promise.all(findProjectQueue);
    return {
      uid: userPlatform.uid,
      projects: projects.filter((value: ProjectVO | null): value is ProjectVO => value !== null),
      materials: [],
      teams: []
    };
  }

  // 获取用户信息
  // 支持登录名、邮箱、手机号获取，这些都是不会重复的
  // 注意！平台 uid 为平台校验所需，不能对外使用 uid 可查询任何用户信息
  async getUserPlatformByUsernameLike(id: string): Promise<UserPlatformVO | null> {
    const userInfo =
      (await this.dbUserService.findUserInfoBy({ username: id })) ||
      (await this.dbUserService.findUserInfoBy({ email: id })) ||
      (await this.dbUserService.findUserInfoBy({ telephone: id }));
    if (!userInfo?.uid) {
      return null;
    }
    return this.getUserPlatformByUid(userInfo.uid);
  }

  // 注册
  async register(registerUserDto: RegisterUserDTO) {
    const { username, password } = registerUserDto;
    const isRepeat = await this.dbUserService.isUsernameExists(username);
    if (isRepeat) {
      const msg = `"${username}" 已存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    }
    // 生成一个平台 uid
    const uid = await this.generateUid();
    // 写校验表
    const insertUserAuth = this.dbUserService.insertUserAuth({
      uid,
      password
    });
    // 写用户信息表
    // 写入用户信息表
    const insertAuthInfo = this.dbUserService.insertUserInfo({
      uid,
      username,
      nickname: `用户${Date.now()}`,
      email: null,
      telephone: null
    });
    // 写入平台用户表
    const insertUserPlatform = this.dbUserService.insertUserPlatform({
      uid,
      projects: [],
      materials: [],
      teams: []
    });
    try {
      await Promise.all([insertUserAuth, insertAuthInfo, insertUserPlatform]);
      return true;
    } catch (err) {
      this.deleteUser(uid);
      this.logger.error("注册", err.message);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 删除用户，删除其所有数据
  private async deleteUser(uid: string) {
    const removeUserAuth = this.dbUserService.deleteUserAuthByUid(uid);
    const removeUserInfo = this.dbUserService.deleteUserInfoByUid(uid);
    const removeUserPlatform = this.dbUserService.deleteUserPlatformByUid(uid);
    return Promise.all([removeUserAuth, removeUserInfo, removeUserPlatform]);
  }
}
