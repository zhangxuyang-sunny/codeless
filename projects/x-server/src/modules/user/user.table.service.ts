import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { UserAuthDO, UserAuthDocument } from "./user_auth.schema";
import { UserInfoDO, UserInfoDocument } from "./user_info.schema";
import { UserPlatformDocument, UserPlatformSchema } from "./user_platform.schema";

@Injectable()
export class TableUserService {
  constructor(
    @InjectModel(UserAuthDO.name, database.db_user)
    private readonly userAuthModel: Model<UserAuthDocument>,
    @InjectModel(UserInfoDO.name, database.db_user)
    private readonly userInfoModel: Model<UserInfoDocument>,
    @InjectModel(UserPlatformSchema.name, database.db_user)
    private readonly userPlatformModel: Model<UserPlatformDocument>
  ) {}

  // 检测 uid 是否存在
  // 需要检测多张表，避免重复
  async isUidExists(uid: string) {
    const existsAll = await Promise.all([
      this.userInfoModel.exists({ uid }),
      this.userAuthModel.exists({ uid }),
      this.userPlatformModel.exists({ uid })
    ]);
    return existsAll.every(Boolean);
  }

  // 检测 username 是否存在
  async isUsernameExists(username: string) {
    const existsAll = await Promise.all([
      this.userInfoModel.exists({ username }),
      this.userPlatformModel.exists({ username })
    ]);
    return existsAll.every(Boolean);
  }

  /**
   * 用户基础信息表
   */
  async insertUserInfo(userInfo: UserInfoDO) {
    const userInfoModel = new this.userInfoModel(userInfo);
    return userInfoModel.save();
  }
  async deleteUserInfoById(uid: string) {
    const userAuthModel = new this.userInfoModel({ uid });
    return userAuthModel.delete();
  }
  async findUserInfoBy(query: Partial<UserInfoDO>) {
    return this.userInfoModel.findOne(query);
  }

  /**
   * 用户权限表
   */
  async insertUserAuth(userAuth: UserAuthDO) {
    const userAuthModel = new this.userAuthModel(userAuth);
    return userAuthModel.save();
  }
  async deleteUserAuthById(uid: string) {
    const userAuthModel = new this.userAuthModel({ uid });
    userAuthModel.delete();
    return true;
  }
  async findUserAuthBy(query: Partial<UserAuthDO>) {
    return this.userAuthModel.findOne(query);
  }

  /**
   * 平台用户数据表
   */
  async insertUserPlatform(userPlatform: UserPlatformSchema) {
    return this.userPlatformModel.insertMany(userPlatform);
  }
  async updateUserPlatform(userPlatform: Partial<UserPlatformSchema>) {
    const { uid, ...data } = userPlatform;
    return this.userPlatformModel.findOneAndUpdate({ uid }, data);
  }
  async addProjectId(uid: string, pid: string) {
    return this.userPlatformModel.findOneAndUpdate({ uid }, { $push: { projects: pid } });
  }
  async deleteUserPlatformByUid(uid: string) {
    const deleted = await this.userPlatformModel.deleteMany({ uid });
    return deleted.deletedCount;
  }
  async findUserPlatformById(uid: string) {
    return this.userPlatformModel.findOne({ uid }).exec();
  }

  async findUserResources(uid: string) {
    return this.userPlatformModel.find({ uid }).exec();
  }
}
