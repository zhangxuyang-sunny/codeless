import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import database from "config/database";
import { AuthModule } from "../auth/auth.module";
import { ResourceModule } from "../resource/resource.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserInfoModel } from "./user-info.schema";
import { UserPlatformModel } from "./user-platform.schema";

@Module({
  imports: [
    MongooseModule.forFeature([UserInfoModel, UserPlatformModel], database.db_user),
    forwardRef(() => ResourceModule),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
