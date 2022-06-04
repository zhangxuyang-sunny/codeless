import type Datastore from "nedb-promises";
import path from "path";
import Nedb from "nedb-promises";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";

let project: Datastore<{
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}> | null;

@Injectable()
export class DatabaseService {
  constructor(configurationService: ConfigurationService) {
    const projectDBFile = configurationService.getProjectDBFile();
    // 保持 project 为单例
    if (!project) {
      project = Nedb.create({
        filename: path.resolve(projectDBFile),
        autoload: true,
        timestampData: true
      });
    }
  }

  get project() {
    return project;
  }
}
