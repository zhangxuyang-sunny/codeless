import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { CreateUserVO } from "src/data-modal/vo/UserVO";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // 获取用户信息
  @Get("/")
  getUser(@Headers("userId") userId: string) {
    return this.userService.getUserByUsernameLike(userId);
  }

  //
  @Post("/create")
  createUser(@Body() createUserInfo: CreateUserVO) {
    return this.userService.createUser(createUserInfo);
  }
}
