import type { UserInfoVO } from "src/data-modal/vo/UserVO";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/services/database.service";
import { CreateUserDTO } from "src/data-modal/dto/userDTO";

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  // 校验 username 是否重复
  async isUsernameRepeat(username: string) {
    const user = await this.getUserByUsername(username);
    return !!user;
  }

  // 使用内部 uid 获取用户数据
  async getUserByUid(uid: string): Promise<UserInfoVO> {
    return this.dbService.user.findOne({ uid });
  }

  // 使用 username 精确匹配
  async getUserByUsername(username: string) {
    return this.dbService.user.findOne({ username });
  }

  // 获取用户信息
  // 支持 平台uid、登录名、邮箱、手机号获取，这些都是不会重复的
  async getUserByUsernameLike(username: string): Promise<UserInfoVO> {
    const userInfoPO = await (this.dbService.user.findOne({ username }) ||
      this.dbService.user.findOne({ uid: username }) ||
      this.dbService.user.findOne({ email: username }) ||
      this.dbService.user.findOne({ telephone: username }));
    if (!userInfoPO) {
      return null;
    }
    // 批量获取工程数据
    const getProjectQueue = userInfoPO.projects.map(pid => {
      return this.dbService.project.findOne({ pid });
    });
    const userInfoVO: UserInfoVO = {
      ...userInfoPO,
      projects: await Promise.all(getProjectQueue)
    };
    return userInfoVO;
  }

  // 创建用户
  async createUser(userData: CreateUserDTO) {
    return this.dbService.user.insert(userData);
  }

  // 获取用户令牌
  async getUserAuthToken(username: string) {
    return this.dbService.auth.findOne({ username });
  }
}
