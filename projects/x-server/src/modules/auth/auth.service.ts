import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TableUserService } from "../user/user.table.service";

// 用户校验服务
@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly dbUserService: TableUserService,
    private readonly jwtService: JwtService
  ) {}

  // 校验用户密码
  async validatePassword(username: string, password: string): Promise<any> {
    const userInfo = await this.dbUserService.findUserInfoBy({ username });
    return userInfo && userInfo.password === password;
  }

  // 登录
  async login(user: { username: string; password: string }) {
    return {
      access_token: this.jwtService.sign(user)
    };
  }
}
