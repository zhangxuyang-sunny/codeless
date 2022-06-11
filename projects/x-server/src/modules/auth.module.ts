import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/auth/constants";
import { LocalStrategy } from "src/auth/local.strategy";
import { DbUserModule } from "src/database/db.user.module";
import { AuthService } from "src/services/auth.service";
import { UserModule } from "./user.module";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }
    }),
    DbUserModule,
    UserModule,
    PassportModule
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
