import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { LocalStrategy } from "./local.strategy";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }
    }),
    forwardRef(() => UserModule),
    PassportModule
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
