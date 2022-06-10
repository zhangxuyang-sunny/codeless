import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import shortUUID from "short-uuid";
import { RegisterUserDTO } from "src/data-modal/dto/userDTO";
import { UserAuthPO, UserInfoPO } from "src/data-modal/po/UserPO";
import { DatabaseService } from "src/services/database.service";
import { UsersService } from "../business/users.service";

// 用户校验服务
@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly dbService: DatabaseService
  ) {}

  // 生成 uid，保证全局唯一
  private async generateUid() {
    let uid = shortUUID().generate();
    while ((await this.dbService.user_auth.count({ uid })) > 0) {
      uid = shortUUID().generate();
    }
    return uid;
  }

  // 创建用户校验信息
  private async createUserAuth(user: UserAuthPO) {
    return this.dbService.user_auth.insert<UserAuthPO>(user);
  }

  private async removeUserAuth(user: UserAuthPO) {
    return this.dbService.user_auth.remove(user, { multi: true });
  }

  // 校验用户密码
  async validatePassword(username: string, password: string): Promise<any> {
    const userInfoPO = await this.usersService.getUserByUsername(username);
    const user = await this.usersService.getUserAuthToken(userInfoPO.uid);
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
  async register(user: RegisterUserDTO) {
    const { username, password } = user;
    const isRepeat = await this.usersService.isUsernameRepeat(username);
    if (isRepeat) {
      const msg = `"${username}" 已存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    }
    // 生成一个平台 uid
    const uid = await this.generateUid();
    // 写校验表
    const createAuth = this.createUserAuth({ uid, password });
    const userInfoPO: UserInfoPO = {
      uid,
      nickname: `用户${Date.now()}`,
      email: null,
      telephone: null,
      username
    };
    // 写用户信息表
    const createUser = this.usersService.createUser(userInfoPO);
    try {
      const [, user] = await Promise.all([createAuth, createUser]);
      return user;
    } catch (err) {
      this.removeUserAuth({ uid, password });
      this.usersService.deleteUser(uid);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
