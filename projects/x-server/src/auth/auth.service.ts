import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import shortUUID from "short-uuid";
import { UserAuthPO } from "src/data-modal/po/UserPO";
import { DatabaseService } from "src/services/database.service";
import { UsersService } from "../business/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly dbService: DatabaseService
  ) {}

  // 校验用户密码
  async validatePassword(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserAuthToken(username);
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

  // 注册
  async register(user: { username: string; password: string }) {
    const { username, password } = user;
    const isRepeat = await this.usersService.isUsernameRepeat(username);
    if (isRepeat) {
      const msg = `"${username}" 已存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    }
    await this.dbService.auth.insert<UserAuthPO>({ username, password });
    return this.usersService.createUser({
      uid: shortUUID().new(),
      username
    });
  }
}
