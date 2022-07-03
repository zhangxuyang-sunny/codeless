import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { IFindProjectsParams, IViewOption } from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";
import { ProjectDocument, ProjectPO } from "./project.schema";
import { FindProjectDTO } from "./project.modal";

@Injectable()
export class TableProjectService {
  constructor(
    @InjectModel(ProjectPO.name, database.db_resource)
    public readonly projectModel: Model<ProjectDocument>
  ) {}

  async isIdExists(id: string) {
    return this.projectModel.exists({ id });
  }

  /**
   * 项目表
   */
  // 新增项目
  async createProject(project: ProjectPO) {
    return this.projectModel.insertMany(project);
  }

  // 更新项目下视图配置
  async updateViewOptions(id: string, viewOptions: IViewOption[]) {
    const data = await this.projectModel.findOne({ id });
    if (data?.router.views) {
      data.router.views = viewOptions;
      data.save();
      return data;
    } else {
      throw new HttpException("更新失败", HttpStatus.BAD_REQUEST);
    }
  }

  // 删除，将 status 标记为 ProjectStatus.delete 状态，可作为回收站
  async deleteProject(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.delete });
  }

  // 软删除，将 status 标记为 ProjectStatus.unlink 状态
  async unlinkProject(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.unlink });
  }

  // 恢复，将 status 标记为 ProjectStatus.normal 状态
  async revertProject(id: string) {
    return this.projectModel.findOneAndUpdate({ id }, { status: ProjectStatus.delete });
  }

  async findProjects(query: IFindProjectsParams): Promise<ProjectPO[]> {
    return this.projectModel.find(query);
  }

  async findProject(query: FindProjectDTO): Promise<ProjectPO | null> {
    return this.projectModel.findOne(query).exec();
  }
}
