import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserAuthDTO } from "src/database/dto/create-user-auth.dto";
import { RegisterUserDTO } from "src/database/dto/register-user.dto";
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

  // 登出
  @Post("logout")
  async logout() {
    return;
  }

  // 注册
  @Post("register")
  async register(@Body() registerUser: RegisterUserDTO) {
    return this.authService.register(registerUser);
  }

  @Post("test")
  async test(@Body() user: CreateUserAuthDTO) {
    return this.authService.test(user);
  }
}
