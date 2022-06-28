import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { ProjectDO, ProjectDocument, ProjectStatus } from "./schemas/project.schema";
import { ProjectVO, QueryProjectDTO } from "./modal/project";
import { ViewOption } from "packages/x-nodes";

@Injectable()
export class TableProjectService {
  constructor(
    @InjectModel(ProjectDO.name, database.db_project)
    private readonly projectModel: Model<ProjectDocument>
  ) {}

  async isPidExists(projectId: string) {
    return this.projectModel.exists({ projectId });
  }

  /**
   * 项目表
   */
  // 创建工程
  async insertProject(project: ProjectDO) {
    return this.projectModel.insertMany(project);
  }

  // 项目下新增页面 id 关联
  async addPageIdToProject(projectId: string, pageId: string) {
    return this.projectModel.findOneAndUpdate({ projectId }, { $addToSet: { pages: pageId } });
  }

  async updateViewOptions(projectId: string, viewOptions: ViewOption[]) {
    const data = await this.projectModel.findOne({ projectId });
    console.log(data, viewOptions);
    data?.schema.router?.views?.push(...viewOptions);
    data?.save();
    return data;
  }

  // 删除工程，将 status 标记为 ProjectStatus.delete 状态，可作为回收站
  async deleteProjectByPid(projectId: string) {
    return this.projectModel.findOneAndUpdate({ projectId }, { status: ProjectStatus.delete });
  }

  // 软删除工程，将 status 标记为 ProjectStatus.unlink 状态
  async unlinkProjectByPid(projectId: string) {
    return this.projectModel.findOneAndUpdate({ projectId }, { status: ProjectStatus.unlink });
  }

  // 恢复工程，将 status 标记为 ProjectStatus.normal 状态
  async revertProjectByPid(projectId: string) {
    return this.projectModel.findOneAndUpdate({ projectId }, { status: ProjectStatus.delete });
  }

  async findProjectsBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO[]> {
    return this.projectModel.find(query);
  }

  async findProjectBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO | null> {
    return this.projectModel.findOne(query);
  }
}
