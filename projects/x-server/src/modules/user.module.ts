import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { DbResourceModule } from "src/database/db.resource.module";
import { DbUserModule } from "src/database/db.user.module";
import { UserService } from "src/services/user.service";
import { AuthModule } from "./auth.module";

@Module({
  imports: [DbResourceModule, DbUserModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [DbUserModule, UserService]
})
export class UserModule {}
