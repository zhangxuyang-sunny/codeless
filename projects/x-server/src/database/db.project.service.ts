import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { ProjectDO, ProjectDocument } from "./schemas/project.schema";
import { ProjectPO } from "./modal/project";

@Injectable()
export class DbProjectService {
  constructor(
    @InjectModel(ProjectDO.name, database.db_project)
    private readonly projectModel: Model<ProjectDocument>
  ) {}

  /**
   * 项目表
   */
  async createProject(project: ProjectPO) {
    return this.projectModel.insertMany(project);
  }
  async deleteProjectByPid(pid: string) {
    const deleteResult = await this.projectModel.deleteMany({ pid }).exec();
    return deleteResult.acknowledged;
  }
  async findProjectBy(query: Partial<ProjectDO>): Promise<ProjectDO | null> {
    return this.projectModel.findOne(query).exec();
  }
  async isPidExists(pid: string) {
    return this.projectModel.exists({ pid });
  }
}
