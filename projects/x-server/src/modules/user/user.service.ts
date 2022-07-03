import shortUUID from "short-uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { TableProjectService } from "../resource/project/project.table.service";
import { ProjectVO } from "../resource/project/project.modal";
import { TableUserService } from "./user.table.service";
import { RegisterUserDTO, UserPlatformVO } from "./user.modal";

@Injectable()
export class UserService {
  constructor(
    private readonly tbProjectService: TableProjectService,
    private readonly tbUserService: TableUserService
  ) {}
  private readonly logger = new Logger();

  private async generateId() {
    let id = shortUUID().generate();
    while (await this.tbUserService.isUidExists(id)) {
      id = shortUUID().generate();
    }
    return id;
  }

  // 注册
  async register(registerUserDto: RegisterUserDTO) {
    const { username, password } = registerUserDto;
    const isRepeat = await this.tbUserService.isUsernameExists(username);
    if (isRepeat) {
      const msg = `"${username}" 已存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    }
    const uid = await this.generateId();
    // 写入用户信息表
    const insertAuthInfo = this.tbUserService //
      .insertUserInfo({
        uid,
        username,
        nickname: `用户${uid}`,
        email: null,
        telephone: null,
        password
      });
    // 写入平台用户表
    const insertUserPlatform = this.tbUserService //
      .insertUserPlatform({
        uid,
        projects: [],
        views: [],
        materials: [],
        teams: []
      });
    try {
      await Promise.all([insertAuthInfo, insertUserPlatform]);
      return true;
    } catch (err) {
      this.deleteUser(uid);
      this.logger.error("注册", err.message);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 删除用户，删除其所有数据
  private async deleteUser(id: string) {
    const removeUserInfo = this.tbUserService.deleteUserInfoById(id);
    const removeUserPlatform = this.tbUserService.deleteUserPlatformByUid(id);
    return Promise.all([removeUserInfo, removeUserPlatform]);
  }

  // 使用内部 uid 获取用户数据
  private async getUserPlatformById(id: string): Promise<UserPlatformVO | null> {
    const userPlatform = await this.tbUserService.findUserPlatformById(id);
    if (!userPlatform) return null;
    const findProjectQueue = userPlatform.projects.map(id =>
      this.tbProjectService.findProject({ id })
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
      (await this.tbUserService.findUserInfoBy({ username: id })) ||
      (await this.tbUserService.findUserInfoBy({ email: id })) ||
      (await this.tbUserService.findUserInfoBy({ telephone: id }));
    if (!userInfo?.uid) {
      return null;
    }
    return this.getUserPlatformById(userInfo.uid);
  }

  // TODO：改成 query 形式
  async findUserPlatformById(uid: string) {
    return this.tbUserService.findUserPlatformById(uid);
  }
}
