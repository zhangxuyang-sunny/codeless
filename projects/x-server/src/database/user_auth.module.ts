import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// import { CatsController } from "./cats.controller";
import { UserAuthService } from "./user_auth.service";
import { UserAuth, UserAuthSchema } from "./schemas/user_auth.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: UserAuth.name, schema: UserAuthSchema }])],
  // controllers: [CatsController],
  providers: [UserAuthService]
})
export class UserAuthModule {}
