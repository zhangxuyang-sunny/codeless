import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { ProjectDO, ProjectDocument, ProjectStatus } from "./schemas/project.schema";
import { ProjectVO, QueryProjectDTO } from "./modal/project";

@Injectable()
export class TableProjectService {
  constructor(
    @InjectModel(ProjectDO.name, database.db_project)
    private readonly projectModel: Model<ProjectDocument>
  ) {}

  async isPidExists(pid: string) {
    return this.projectModel.exists({ pid });
  }

  /**
   * 项目表
   */
  // 创建工程
  async insertProject(project: ProjectDO) {
    return this.projectModel.insertMany(project);
  }

  // 删除工程，将 status 标记为 ProjectStatus.delete 状态，可作为回收站
  async deleteProjectByPid(pid: string) {
    return this.projectModel.findOneAndUpdate({ pid }, { status: ProjectStatus.delete });
  }

  // 软删除工程，将 status 标记为 ProjectStatus.unlink 状态
  async unlinkProjectByPid(pid: string) {
    return this.projectModel.findOneAndUpdate({ pid }, { status: ProjectStatus.unlink });
  }

  // 恢复工程，将 status 标记为 ProjectStatus.normal 状态
  async revertProjectByPid(pid: string) {
    return this.projectModel.findOneAndUpdate({ pid }, { status: ProjectStatus.delete });
  }

  async findProjectsBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO[]> {
    return this.projectModel.find(query);
  }

  async findProjectBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO | null> {
    return this.projectModel.findOne(query);
  }
}
