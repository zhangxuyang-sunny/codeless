import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserAuth, UserAuthDocument } from "./schemas/user_auth.schema";
import { CreateUserAuthDTO } from "./dto/create-user-auth.dto";

@Injectable()
export class UserAuthService {
  constructor(@InjectModel(UserAuth.name) private catModel: Model<UserAuthDocument>) {}

  async create(createUserAuthDto: CreateUserAuthDTO): Promise<UserAuth> {
    const createdUserAuth = new this.catModel(createUserAuthDto);
    return createdUserAuth.save();
  }

  async findAll(): Promise<UserAuth[]> {
    return this.catModel.find().exec();
  }
}
