import shortUUID from "short-uuid";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { database } from "config/database";
import { ProjectService } from "../resource/project/project.service";
import { RegisterUserDTO } from "./user.modal";
import { UserInfoPO, UserInfoDocument } from "./user-info.schema";
import { UserPlatformDocument, UserPlatformPO } from "./user-platform.schema";

@Injectable()
export class UserService {
  private readonly logger = new Logger();
  constructor(
    private readonly projectService: ProjectService,
    @InjectModel(UserInfoPO.name, database.db_user)
    private readonly userInfoModel: Model<UserInfoDocument>,
    @InjectModel(UserPlatformPO.name, database.db_user)
    private readonly userPlatformModel: Model<UserPlatformDocument>
  ) {}

  // 检测用户id是否存在
  async isUidExists(uid: string) {
    const existsAll = await Promise.all([
      this.userInfoModel.exists({ id: uid }),
      this.userPlatformModel.exists({ id: uid })
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

  private async generateId() {
    let id = shortUUID().generate();
    while (await this.isUidExists(id)) {
      id = shortUUID().generate();
    }
    return id;
  }

  /**
   * 用户基础信息表
   */
  async insertUserInfo(userInfo: UserInfoPO) {
    const userInfoModel = new this.userInfoModel(userInfo);
    return userInfoModel.save();
  }
  async deleteUserInfoById(uid: string) {
    const userAuthModel = new this.userInfoModel({ uid });
    return userAuthModel.delete();
  }
  async findUserInfo(query: Partial<UserInfoPO>) {
    return this.userInfoModel.findOne(query);
  }

  /**
   * 平台用户数据表
   */
  async insertUserPlatform(userPlatform: UserPlatformPO) {
    return this.userPlatformModel.insertMany(userPlatform);
  }
  async updateUserPlatform(userPlatform: Partial<UserPlatformPO>) {
    const { id: uid, ...data } = userPlatform;
    return this.userPlatformModel.findOneAndUpdate({ id: uid }, data);
  }
  async addProjectId(uid: string, pid: string) {
    return this.userPlatformModel.findOneAndUpdate({ id: uid }, { $push: { projects: pid } });
  }
  async deleteUserPlatformByUid(uid: string) {
    const deleted = await this.userPlatformModel.deleteMany({ id: uid });
    return deleted.deletedCount;
  }
  async findUserPlatformById(uid: string) {
    return this.userPlatformModel.findOne({ id: uid }).exec();
  }

  async findUserResources(uid: string) {
    return this.userPlatformModel.find({ id: uid }).exec();
  }

  // 注册
  async register(registerUserDto: RegisterUserDTO) {
    const { username, password } = registerUserDto;
    const isRepeat = await this.isUsernameExists(username);
    if (isRepeat) {
      const msg = `"${username}" 已存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    }
    const uid = await this.generateId();
    // 写入用户信息表
    const insertAuthInfo = this.insertUserInfo({
      id: uid,
      username,
      nickname: `用户${uid}`,
      email: null,
      telephone: null,
      password
    });
    // 写入平台用户表
    const insertUserPlatform = this.insertUserPlatform({
      id: uid,
      projects: [],
      views: [],
      materials: [],
      teams: []
    });
    try {
      await Promise.all([insertAuthInfo, insertUserPlatform]);
      return true;
    } catch (err) {
      this.deleteUser(uid);
      this.logger.error("注册", err.message);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 删除用户，删除其所有数据
  private async deleteUser(id: string) {
    const removeUserInfo = this.deleteUserInfoById(id);
    const removeUserPlatform = this.deleteUserPlatformByUid(id);
    return Promise.all([removeUserInfo, removeUserPlatform]);
  }

  // // 使用内部 uid 获取用户数据
  // private async getUserPlatformById(id: string): Promise<UserPlatformVO | null> {
  //   const userPlatform = await this.findUserPlatformById(id);
  //   if (!userPlatform) return null;
  //   const findProjectQueue = userPlatform.projects.map(id =>
  //     this.projectService.findProject({ id })
  //   );
  //   const projects = await Promise.all(findProjectQueue);
  //   return {
  //     uid: userPlatform.uid,
  //     projects: projects.filter((value: ProjectVO | null): value is ProjectVO => value !== null),
  //     materials: [],
  //     teams: []
  //   };
  // }

  // // 获取用户信息
  // // 支持登录名、邮箱、手机号获取，这些都是不会重复的
  // // 注意！平台 uid 为平台校验所需，不能对外使用 uid 可查询任何用户信息
  // async getUserPlatformByUsernameLike(id: string): Promise<UserPlatformVO | null> {
  //   const userInfo =
  //     (await this.findUserInfoBy({ username: id })) ||
  //     (await this.findUserInfoBy({ email: id })) ||
  //     (await this.findUserInfoBy({ telephone: id }));
  //   if (!userInfo?.id) {
  //     return null;
  //   }
  //   return this.getUserPlatformById(userInfo.id);
  // }
}
