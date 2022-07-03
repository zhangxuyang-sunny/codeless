import shortUUID from "short-uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IsProjectExists } from "src/decorates/project.decorate";
import { ICreateProjectParams, IProjectViewLink } from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";
import { UserService } from "../user/user.service";
import { TableUserService } from "../user/user.table.service";
import { TableProjectService } from "./project.table.service";
import { ProjectSchemaVO, QueryProjectDTO } from "./project.modal";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger();
  constructor(
    private readonly userService: UserService,
    private readonly tbUserService: TableUserService,
    private readonly tbProjectService: TableProjectService
  ) {}

  // 生成 projectId，并保证不重复
  private async generateId() {
    let id = shortUUID.generate();
    while (await this.tbProjectService.isIdExists(id)) {
      id = shortUUID.generate();
    }
    return id;
  }

  // 创建项目
  async createProject(data: ICreateProjectParams, uid: string) {
    const userInfo = await this.tbUserService.findUserInfoBy({ uid });
    if (!userInfo) {
      this.logger.warn(`查询用户异常`, uid);
      throw new HttpException(`创建工程失败，用户异常`, HttpStatus.BAD_REQUEST);
    }
    const id = await this.generateId();
    const createUser = userInfo.nickname;
    // 写入工程数据库
    const result = await this.tbProjectService.insertProject({
      id: id,
      version: "0",
      createdUser: createUser,
      updatedUser: createUser,
      title: data.title,
      description: data.description,
      status: ProjectStatus.normal,
      router: { base: "", mode: "hash", views: [] },
      datasets: []
    });
    // 更新用户数据库
    // 关联应用
    this.tbUserService.addProjectId(uid, id);
    this.logger.log(JSON.stringify(result), "创建工程");
    return result;
  }

  // 关丽娜页面
  async linkPageToProject(projectId: string, pageId: string) {
    return this.tbProjectService.addViewIdToProject(projectId, pageId);
  }

  // 更新路由和页面关联信息
  async updateViewOptions(appId: string, viewOptions: IProjectViewLink[]) {
    return this.tbProjectService.updateViewOptions(appId, viewOptions);
  }

  // 条件查找工程
  async findProjectsBy(query: Partial<QueryProjectDTO>): Promise<ProjectSchemaVO[]> {
    return this.tbProjectService.findProjectsBy(query);
  }

  async findProjectBy(query: Partial<QueryProjectDTO>): Promise<ProjectSchemaVO | null> {
    return this.tbProjectService.findProjectBy(query);
  }

  // 获取当前用户资源数据
  async getProjectList(query: Partial<QueryProjectDTO>, uid: string) {
    return this.tbUserService.findUserResources(uid);
    // const userPlatform = await this.userService.findUserPlatformPOByUid(uid);
    // if (!userPlatform) return [];
    // const list = await Promise.all(
    //   userPlatform.projects.map(id => this.findProjectBy({ id, ...query }))
    // );
    // return list.filter(Boolean);
  }

  // 通过状态获取项目列表
  private async findProjectsByStatus(status: ProjectStatus) {
    return this.tbProjectService.findProjectsBy({ status });
  }

  // 获取正常状态的工程列表
  async findNormalProjects() {
    return this.findProjectsByStatus(ProjectStatus.normal);
  }

  // 查找 unlink 的工程，可用于回收站查询
  async findUnlinkProjects() {
    return this.findProjectsByStatus(ProjectStatus.unlink);
  }

  // 查找 delete 的工程，用于后门查询
  async findDeleteProjects() {
    return this.findProjectsByStatus(ProjectStatus.delete);
  }

  // 配合 IsProjectExists 装饰器使用
  async checkProjectExists(projectId: string) {
    return this.tbProjectService.isIdExists(projectId);
  }

  // 软删除
  // 仅仅将状态 status 改为 unlink
  @IsProjectExists()
  async handleUnlink(id: string) {
    this.logger.log(id, "软删除工程");
    return this.tbProjectService.unlinkProjectById(id);
  }

  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  @IsProjectExists()
  async handleDelete(id: string) {
    this.logger.log(id, "删除工程");
    return this.tbProjectService.unlinkProjectById(id);
  }

  // 恢复工程
  @IsProjectExists()
  async handleRevert(id: string) {
    this.logger.log(id, "恢复工程");
    return this.tbProjectService.revertProjectById(id);
  }
}
