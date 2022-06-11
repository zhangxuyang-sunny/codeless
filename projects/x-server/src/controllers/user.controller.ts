import { Body, Controller, Get, Headers, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUserDTO } from "src/database/modal/user";
import { UserService } from "src/services/user.service";
import { AuthService } from "src/services/auth.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  // 登录
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body("username") username: string, @Body("password") password: string) {
    return this.authService.login({ username, password });
  }

  // 登出
  @Post("logout")
  async logout() {
    return;
  }

  // 注册
  @Post("register")
  async register(@Body() registerUser: RegisterUserDTO) {
    return this.userService.register(registerUser);
  }

  // 获取用户信息
  @Get("/")
  async getUser(@Headers("id") id: string) {
    return this.userService.getUserPlatformByUsernameLike(id);
  }
}
