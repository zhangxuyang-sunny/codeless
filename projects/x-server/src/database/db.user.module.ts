import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { database } from "config/database";
import { TableUserService } from "./table.user.service";
import { DbResourceModule } from "./db.resource.module";
import { UserInfoFeature } from "./schemas/user_info.schema";
import { UserAuthFeature } from "./schemas/user_auth.schema";
import { UserPlatformModel } from "./schemas/user_platform.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
      [UserAuthFeature, UserInfoFeature, UserPlatformModel],
      database.db_user
    ),
    DbResourceModule
  ],
  providers: [TableUserService],
  exports: [TableUserService]
})
export class DbUserModule {}
