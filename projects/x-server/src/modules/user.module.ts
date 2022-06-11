import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { DbProjectModule } from "src/database/db.project.module";
import { DbUserModule } from "src/database/db.user.module";
import { UserService } from "src/services/user.service";
import { AuthModule } from "./auth.module";

@Module({
  imports: [DbProjectModule, DbUserModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
