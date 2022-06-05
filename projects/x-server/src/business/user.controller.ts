import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { CreateUserVO } from "src/data-modal/vo/UserVO";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 获取用户信息
  @Get("/")
  getUser(@Headers("userId") userId: string) {
    return this.userService.getUserInfo(userId);
  }

  //
  @Post("/create")
  createUser(@Body() createUserInfo: CreateUserVO) {
    return this.userService.createUser(createUserInfo);
  }
}
