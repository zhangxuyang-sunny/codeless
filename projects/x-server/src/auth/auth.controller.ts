import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body("username") username: string, @Body("password") password: string) {
    return this.authService.login({ username, password });
  }

  // 注册
  @Post("register")
  async register(@Body("username") username: string, @Body("password") password: string) {
    //
  }
}
