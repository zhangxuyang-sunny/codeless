import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { IProjectViewLink } from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";
import { ProjectDocument, ProjectSchema } from "./project.schema";
import { ProjectSchemaVO, QueryProjectDTO } from "./project.modal";

@Injectable()
export class TableProjectService {
  constructor(
    @InjectModel(ProjectSchema.name, database.db_resource)
    private readonly projectModel: Model<ProjectDocument>
  ) {}

  async isIdExists(id: string) {
    return this.projectModel.exists({ id });
  }

  /**
   * 项目表
   */
  // 创建工程
  async insertProject(app: ProjectSchema) {
    return this.projectModel.insertMany(app);
  }

  // 项目下新增页面 id 关联
  async addViewIdToProject(pid: string, vid: string) {
    return this.projectModel.findOneAndUpdate({ id: pid }, { $addToSet: { views: vid } });
  }

  async updateViewOptions(id: string, viewOptions: IProjectViewLink[]) {
    const data = await this.projectModel.findOne({ id });
    if (data?.router.views) {
      data.router.views = viewOptions;
      data.save();
      return data;
    } else {
      throw new HttpException("更新失败", HttpStatus.BAD_REQUEST);
    }
  }

  // 删除工程，将 status 标记为 ProjectStatus.delete 状态，可作为回收站
  async deleteProjectById(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.delete });
  }

  // 软删除工程，将 status 标记为 ProjectStatus.unlink 状态
  async unlinkProjectById(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.unlink });
  }

  // 恢复工程，将 status 标记为 ProjectStatus.normal 状态
  async revertProjectById(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.delete });
  }

  async findProjectsBy(query: Partial<QueryProjectDTO>): Promise<ProjectSchemaVO[]> {
    return this.projectModel.find(query);
  }

  async findProjectBy(query: Partial<QueryProjectDTO>): Promise<ProjectSchemaVO | null> {
    return this.projectModel.findOne(query);
  }
}
