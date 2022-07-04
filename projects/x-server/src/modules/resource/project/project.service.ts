import shortUUID from "short-uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import database from "config/database";
import {
  ICreateProjectParams,
  IFindProjectsParams,
  IUpdateProjectParams,
  IViewOption
} from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";
import { UserService } from "../../user/user.service";
import { ProjectVO } from "./project.modal";
import { ProjectDocument, ProjectPO } from "./project.schema";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger();
  constructor(
    // private readonly userService: UserService,
    @InjectModel(ProjectPO.name, database.db_resource)
    public readonly projectModel: Model<ProjectDocument>
  ) {}

  async isIdExists(id: string) {
    return this.projectModel.exists({ id });
  }

  // 生成 projectId，并保证不重复
  private async generateId() {
    let id = shortUUID.generate();
    while (await this.isIdExists(id)) {
      id = shortUUID.generate();
    }
    return id;
  }

  // 检查是否存在
  async checkProjectExists(id: string) {
    if (!(await this.isIdExists(id))) {
      throw new HttpException(`'${id}' 不存在`, HttpStatus.BAD_REQUEST);
    }
  }

  // 创建项目
  async createProject(project: ICreateProjectParams, uid: string) {
    // const userInfo = await this.tbUserService.findUserInfoBy({ uid });
    // if (!userInfo) {
    //   this.logger.warn(`查询用户异常`, uid);
    //   throw new HttpException(`创建工程失败，用户异常`, HttpStatus.BAD_REQUEST);
    // }
    const id = await this.generateId();
    // const createdUser = userInfo.nickname;
    const createdUser = "unknown";
    const result = await this.projectModel.insertMany({
      id: id,
      version: "0.0.1",
      createdUser: createdUser,
      updatedUser: createdUser,
      title: project.title,
      description: project.description,
      status: ProjectStatus.normal,
      router: { base: "", mode: "hash", views: [] },
      datasets: []
    });
    // 用户关联应用
    // this.tbUserService.addProjectId(uid, id);
    this.logger.log(JSON.stringify(result), "create project");
    return result;
  }

  async updateProject(project: IUpdateProjectParams) {
    const { id, ...data } = project;
    await this.checkProjectExists(id);
    const result = await this.projectModel.findOneAndUpdate({ id }, data);
    if (!result) {
      throw new HttpException("update fail", HttpStatus.BAD_REQUEST);
    }
    return result;
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

  // 关联页面
  async linkPageToProject(projectId: string, viewId: string) {
    return this.projectModel.findOneAndUpdate({ id: projectId }, { $addToSet: { views: viewId } });
  }

  // 更新路由和页面关联信息
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

  // 条件查找工程
  // 获取当前用户资源数据
  // TODO:
  // 1. 区分用户查询
  // 2. 时间段查询
  // 3. description title 模糊查询
  async findProjects(query: IFindProjectsParams): Promise<ProjectVO[]> {
    // return this.tbUserService.findUserResources(uid);
    // const userPlatform = await this.userService.findUserPlatformById(uid);
    // if (!userPlatform) return [];
    // const list = await Promise.all(
    //   userPlatform.projects.map(id => this.findProjectBy({ id, ...query }))
    // );
    // return list.filter(Boolean);
    return this.projectModel.find(query);
  }

  async findProject(query: IFindProjectsParams): Promise<ProjectPO | null> {
    return this.projectModel.findOne(query).exec();
  }

  // 通过状态获取项目列表
  private async findProjectsByStatus(status: ProjectStatus) {
    return this.findProjects({ status });
  }

  // 获取正常状态的工程列表
  async findNormalProjects() {
    return this.findProjectsByStatus(ProjectStatus.normal);
  }

  // 查找 unlink 的工程，可用于回收站查询
  async findUnlinkProjects() {
    return this.findProjectsByStatus(ProjectStatus.unlink);
  }

  // 查找 delete 的工程
  async findDeleteProjects() {
    return this.findProjectsByStatus(ProjectStatus.delete);
  }

  // 软删除
  // 仅仅将状态 status 改为 unlink
  async handleUnlink(id: string) {
    await this.checkProjectExists(id);
    this.logger.log(id, "unlink project");
    return this.unlinkProject(id);
  }

  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  async handleDelete(id: string) {
    await this.checkProjectExists(id);
    this.logger.log(id, "delete project");
    return this.unlinkProject(id);
  }

  // 恢复工程
  async handleRevert(id: string) {
    await this.checkProjectExists(id);
    this.logger.log(id, "revert project");
    return this.revertProject(id);
  }
}
