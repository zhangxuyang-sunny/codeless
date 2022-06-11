import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database.service";
import { UserPlatformVO } from "src/database/vo/user-platform.vo";
import { UserPlatformPO } from "src/database/po/user-platform.po";
import { UserInfoPO } from "src/database/po/user-info.po";
import { ProjectPO } from "src/database/po/project.po";

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  // 校验 username 是否重复
  async isUsernameRepeat(username: string) {
    const user = await this.getUserByUsername(username);
    return !!user;
  }

  // 使用内部 uid 获取用户数据
  async getUserByUid(uid: string): Promise<UserPlatformVO | null> {
    return this.dbService.user_info.findOne({ uid });
  }

  // 使用 username 精确匹配
  async getUserByUsername(username: string) {
    return this.dbService.user_info.findOne({ username });
  }

  // 获取用户信息
  // 支持登录名、邮箱、手机号获取，这些都是不会重复的
  // 注意！平台 uid 为平台校验所需，不能对外使用 uid 可查询任何用户信息
  async getUserInfoByUsernameLike(id: string): Promise<UserPlatformVO | null> {
    const userPlatformBO =
      (await this.dbService.user_platform.findOne({ username: id })) ||
      (await this.dbService.user_platform.findOne({ email: id })) ||
      (await this.dbService.user_platform.findOne({ telephone: id }));
    if (!userPlatformBO) {
      return null;
    }
    // 批量获取工程数据
    const getProjectQueue = userPlatformBO.projects.flatMap(pid => {
      const result = this.dbService.project.findOne<ProjectPO>({ pid });
      return result ? [result] : [];
    });
    const userPlatformData: UserPlatformVO = {
      ...userPlatformBO,
      projects: (await Promise.all(getProjectQueue)) || []
    };
    return userPlatformData;
  }

  // 创建用户
  // 写入用户信息表和平台用户表
  async createUser(user: UserInfoPO) {
    // 写入用户信息表
    const insertUserInfo = this.dbService.user_info.insert<UserInfoPO>(user);
    // 构建平台用户数据
    const userPlatformPO = {
      ...user,
      projects: []
    };
    // 写入平台用户表
    const insertUserPlatform = this.dbService.user_platform.insert<UserPlatformPO>(userPlatformPO);
    try {
      const [userInfo] = await Promise.all([insertUserInfo, insertUserPlatform]);
      return userInfo;
    } catch (err) {
      this.dbService.user_info.remove(user, { multi: true });
      this.dbService.user_platform.remove(userPlatformPO, { multi: true });
      throw new HttpException(`create user error ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 删除用户
  async deleteUser(uid: string) {
    const removeUserAuth = this.dbService.user_auth.remove({ uid }, { multi: true });
    const removeUserPlatform = this.dbService.user_platform.remove({ uid }, { multi: true });
    return Promise.all([removeUserAuth, removeUserPlatform]);
  }

  // 获取用户令牌
  async getUserAuthToken(uid: string) {
    return this.dbService.user_auth.findOne({ uid });
  }
}
