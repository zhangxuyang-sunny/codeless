import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/database/dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // 获取用户信息
  @Get("/")
  getUser(@Headers("id") id: string) {
    return this.userService.getUserInfoByUsernameLike(id);
  }

  //
  @Post("/create")
  createUser(@Body() createUserInfo: CreateUserDTO) {
    return this.userService.createUser(createUserInfo);
  }
}
