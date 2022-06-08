import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/data-modal/dto/userDTO";
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
  createUser(@Body() createUserInfo: CreateUserDTO) {
    return this.userService.createUser(createUserInfo);
  }
}
