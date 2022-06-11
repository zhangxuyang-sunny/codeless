import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./constants";
import { UsersModule } from "../business/users.module";
import { UserAuth, UserAuthSchema, COLLECTION } from "src/database/schemas/user_auth.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: UserAuth.name, schema: UserAuthSchema, collection: COLLECTION }],
      "user"
    ),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }
    }),
    UsersModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
