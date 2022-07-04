import type { Response } from "express";
import { Body, Controller, Get, Headers, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { RegisterUserDTO } from "./user.modal";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  // 登录
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(
    @Body("username") username: string,
    @Body("password") password: string,
    @Res() response: Response
  ) {
    const { access_token } = await this.authService.login({ username, password });
    response.cookie("access_token", access_token);
    response.send({ data: 0, message: "登录成功" });
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
  @Get("/info")
  async getUser(@Headers("uid") id: string) {
    return this.userService.findUserInfo({ id });
  }
}
