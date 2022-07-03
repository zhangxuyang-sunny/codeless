import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import database from "config/database";
import { AuthModule } from "../auth/auth.module";
import { ResourceModule } from "../resource/resource.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TableUserService } from "./user.table.service";
import { UserAuthFeature } from "./user_auth.schema";
import { UserInfoFeature } from "./user_info.schema";
import { UserPlatformModel } from "./user_platform.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
      [UserAuthFeature, UserInfoFeature, UserPlatformModel],
      database.db_user
    ),
    AuthModule,
    forwardRef(() => ResourceModule)
  ],
  controllers: [UserController],
  providers: [UserService, TableUserService],
  exports: [UserService, TableUserService]
})
export class UserModule {}
