import { Injectable } from "@nestjs/common";
import { CreateUserVO, UserInfoVO } from "src/data-modal/vo/UserVO";
import { DatabaseService } from "src/services/database.service";

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  // 获取用户信息
  async getUserInfo(userId: string): Promise<UserInfoVO> {
    return this.dbService.user.findOne({ _id: userId });
  }

  // 创建用户
  createUser(userData: CreateUserVO) {
    console.log(userData);
    return this.dbService.user.insert(userData);
  }
}
