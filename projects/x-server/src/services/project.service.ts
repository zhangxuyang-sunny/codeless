import { v4 as uuidV4 } from "uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserService } from "./user.service";
import { TableProjectService } from "src/database/table.project.service";
import { DbUserService } from "src/database/db.user.service";
import { ProjectStatus } from "src/database/schemas/project.schema";
import { CreateProjectDTO, ProjectVO, QueryProjectDTO } from "src/database/modal/project";
import { IsProjectExists } from "src/decorates/project.decorate";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger();
  constructor(
    private readonly tbProjectService: TableProjectService,
    private readonly dbUserService: DbUserService,
    private readonly userService: UserService
  ) {}

  // 生成 pid，并保证不重复
  private async generatePid() {
    let pid = uuidV4();
    while (await this.tbProjectService.isPidExists(pid)) {
      pid = uuidV4();
    }
    return pid;
  }

  // 创建工程，随机生成 pid
  async createProject(project: CreateProjectDTO, uid: string) {
    const pid = await this.generatePid();
    const userInfo = await this.dbUserService.findUserInfoBy({ uid });
    if (!userInfo) {
      this.logger.warn(`查询用户异常`, uid);
      throw new HttpException(`创建工程失败，用户异常`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // 写入工程数据库
    const result = await this.tbProjectService.insertProject({
      pid,
      status: ProjectStatus.normal,
      createUser: userInfo.nickname,
      updateUser: userInfo.nickname,
      version: "0",
      title: project.title,
      schema: project.schema,
      pages: []
    });
    // 更新用户数据库
    // 给当前用户 projects 添加一个 pid
    this.dbUserService.addProjectId(uid, pid);
    this.logger.log(JSON.stringify(result), "创建工程");
    return result;
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
    return Promise.all(userPlatform.projects?.map(pid => this.findProjectBy({ pid, ...query })));
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
  async checkProjectExists(pid: string) {
    return this.tbProjectService.isPidExists(pid);
  }

  // 软删除
  // 仅仅将状态 status 改为 unlink
  @IsProjectExists()
  async handleUnlink(pid: string) {
    this.logger.log(pid, "软删除工程");
    return this.tbProjectService.unlinkProjectByPid(pid);
  }

  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  @IsProjectExists()
  async handleDelete(pid: string) {
    this.logger.log(pid, "删除工程");
    return this.tbProjectService.unlinkProjectByPid(pid);
  }

  // 恢复工程
  @IsProjectExists()
  async handleRevert(pid: string) {
    this.logger.log(pid, "恢复工程");
    return this.tbProjectService.revertProjectByPid(pid);
  }
}
