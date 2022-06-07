import type Datastore from "nedb-promises";
import Nedb from "nedb-promises";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";
import { UserAuthPO, UserPO } from "src/data-modal/po/UserPO";
import { ProjectPO } from "src/data-modal/po/ProjectPO";

type DatastoreWithTimestamp<T = unknown> = Datastore<
  { _id: string; createdAt: Date; updatedAt: Date } & T
> | null;

let project: DatastoreWithTimestamp<ProjectPO> | null;

let user: DatastoreWithTimestamp<UserPO> | null;

let auth: DatastoreWithTimestamp<UserAuthPO> | null;

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
    if (!project) {
      project = this.createDb(configService.projectDBFile);
    }
    if (!user) {
      user = this.createDb(configService.userDBFile);
    }
    if (!auth) {
      auth = this.createDb(configService.authDBFile);
    }
  }

  get project() {
    return project;
  }
  get user() {
    return user;
  }
  get auth() {
    return auth;
  }
}
