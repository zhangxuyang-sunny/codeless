import type Datastore from "nedb-promises";
import Nedb from "nedb-promises";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";
import { UserAuthPO, UserInfoPO, UserPlatformPO } from "src/data-modal/po/UserPO";
import { ProjectPO } from "src/data-modal/po/ProjectPO";

type DatastoreWithTimestamp<T = unknown> = Datastore<
  { _id: string; createdAt: Date; updatedAt: Date } & T
>;

// 用户鉴权表
let user_auth: DatastoreWithTimestamp<UserAuthPO>;
// 用户信息表
let user_info: DatastoreWithTimestamp<UserInfoPO>;
// 平台用户数据表
let user_platform: DatastoreWithTimestamp<UserPlatformPO>;
// 工程表
let project: DatastoreWithTimestamp<ProjectPO>;

@Injectable()
export class DatabaseService {
  private createDb(filename: string) {
    return Nedb.create({
      filename,
      autoload: true,
      timestampData: true
    });
  }
  // 初始化数据库
  // 保持数据库为单例
  constructor(configService: ConfigurationService) {
    user_auth = user_auth || this.createDb(configService.db_user_auth);
    user_info = user_info || this.createDb(configService.db_user_info);
    user_platform = user_platform || this.createDb(configService.db_user_platform);
    project = project || this.createDb(configService.db_project);
  }

  get user_auth() {
    return user_auth;
  }
  get user_info() {
    return user_info;
  }
  get user_platform() {
    return user_platform;
  }
  get project() {
    return project;
  }
}
