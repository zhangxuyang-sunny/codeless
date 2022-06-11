import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DbUserService } from "../database/db.user.service";

// 用户校验服务
@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly dbUserService: DbUserService,
    private readonly jwtService: JwtService
  ) {}

  // 校验用户密码
  async validatePassword(username: string, password: string): Promise<any> {
    const userInfoPO = await this.dbUserService.findUserInfoBy({ username });
    if (!userInfoPO?.uid) {
      return false;
    }
    const user = await this.dbUserService.findUserAuthBy({ uid: userInfoPO.uid });
    if (user && user.password === password) {
      return true;
    }
    return false;
  }

  // 登录
  async login(user: { username: string; password: string }) {
    return {
      access_token: this.jwtService.sign(user)
    };
  }
}
