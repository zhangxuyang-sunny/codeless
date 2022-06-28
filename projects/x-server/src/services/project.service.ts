import { v4 as uuidV4 } from "uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserService } from "./user.service";
import { TableProjectService } from "src/database/table.project.service";
import { TableUserService } from "src/database/table.user.service";
import { ProjectStatus } from "src/database/schemas/project.schema";
import {
  CreateProjectDTO,
  ProjectVO,
  QueryProjectDTO,
  UpdateViewsDTO
} from "src/database/modal/project";
import { IsProjectExists } from "src/decorates/project.decorate";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger();
  constructor(
    private readonly tbProjectService: TableProjectService,
    private readonly tbUserService: TableUserService,
    private readonly userService: UserService
  ) {}

  // 生成 projectId，并保证不重复
  private async generatePid() {
    let projectId = uuidV4();
    while (await this.tbProjectService.isPidExists(projectId)) {
      projectId = uuidV4();
    }
    return projectId;
  }

  // 创建工程
  async createProject(project: CreateProjectDTO, uid: string) {
    const userInfo = await this.tbUserService.findUserInfoBy({ uid });
    if (!userInfo) {
      this.logger.warn(`查询用户异常`, uid);
      throw new HttpException(`创建工程失败，用户异常`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const projectId = await this.generatePid();
    // 写入工程数据库
    const result = await this.tbProjectService.insertProject({
      projectId,
      status: ProjectStatus.normal,
      createUser: userInfo.nickname,
      updateUser: userInfo.nickname,
      version: "0",
      title: project.title,
      schema: project.schema,
      pages: []
    });
    // 更新用户数据库
    // 给当前用户 projects 添加一个 projectId
    this.tbUserService.addProjectId(uid, projectId);
    this.logger.log(JSON.stringify(result), "创建工程");
    return result;
  }

  // 关丽娜页面
  async linkPageToProject(projectId: string, pageId: string) {
    return this.tbProjectService.addPageIdToProject(projectId, pageId);
  }

  // 更新路由和页面关联信息
  async updateViewOptions(projectId: string, viewOptions: UpdateViewsDTO["viewOptions"]) {
    return this.tbProjectService.updateViewOptions(projectId, viewOptions);
  }

  // 条件查找工程
  async findProjectsBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO[]> {
    return this.tbProjectService.findProjectsBy(query);
  }

  async findProjectBy(query: Partial<QueryProjectDTO>): Promise<ProjectVO | null> {
    return this.tbProjectService.findProjectBy(query);
  }

  // 通过用户 uid 获取名下工程
  async getProjectList(query: Partial<QueryProjectDTO>, uid: string) {
    const userPlatform = await this.userService.findUserPlatformPOByUid(uid);
    if (!userPlatform) {
      return [];
    }
    return Promise.all(
      userPlatform.projects?.map(projectId => this.findProjectBy({ projectId, ...query }))
    );
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
    return this.tbProjectService.isPidExists(projectId);
  }

  // 软删除
  // 仅仅将状态 status 改为 unlink
  @IsProjectExists()
  async handleUnlink(projectId: string) {
    this.logger.log(projectId, "软删除工程");
    return this.tbProjectService.unlinkProjectByPid(projectId);
  }

  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  @IsProjectExists()
  async handleDelete(projectId: string) {
    this.logger.log(projectId, "删除工程");
    return this.tbProjectService.unlinkProjectByPid(projectId);
  }

  // 恢复工程
  @IsProjectExists()
  async handleRevert(projectId: string) {
    this.logger.log(projectId, "恢复工程");
    return this.tbProjectService.revertProjectByPid(projectId);
  }
}
