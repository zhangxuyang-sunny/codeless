import { v4 as uuidV4 } from "uuid";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "src/services/database.service";
import { DbProjectService } from "src/database/db.project.service";
import { ProjectStatus } from "src/database/schemas/project.schema";
import { UserService } from "./user.service";
import { DbUserService } from "src/database/db.user.service";
import { CreateProjectDTO, ProjectVO } from "src/database/modal/project";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger();
  constructor(
    private readonly dbService: DatabaseService,
    private readonly dbProjectService: DbProjectService,
    private readonly dbUserService: DbUserService,
    private readonly userService: UserService
  ) {}

  // 生成 pid，并保证不重复
  private async generatePid() {
    let pid = uuidV4();
    while (await this.dbProjectService.isPidExists(pid)) {
      pid = uuidV4();
    }
    return pid;
  }

  // 创建工程，随机生成 pid
  async createProject(project: CreateProjectDTO, uid: string) {
    const pid = await this.generatePid();
    const userInfo = await this.dbUserService.findUserInfoBy({ uid });
    const userPlatform = await this.dbUserService.findUserPlatformBy({ uid });
    if (!userInfo) {
      this.logger.warn(`查询用户异常`, uid);
      throw new HttpException(`创建工程失败，用户异常`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // 写入工程数据库
    const result = await this.dbProjectService.createProject({
      pid,
      status: ProjectStatus.normal,
      createUser: userInfo.nickname,
      updateUser: userInfo.nickname,
      schema: project
    });
    // 更新用户数据库
    this.dbUserService.updateUserPlatform({
      uid,
      projects: [...(userPlatform?.projects || []), pid],
      materials: [],
      teams: []
    });
    this.logger.log(JSON.stringify(result), "创建工程");
    return result;
  }

  // 使用 uuid 查找工程
  async findProjectByUUID(uuid: string) {
    return this.dbService.project.findOne({ uuid });
  }

  // 条件查找工程
  async findProjectsBy(project: Partial<ProjectVO>) {
    // Get query 中 number 转换
    // project.status = Number(project.status);
    return this.dbService.project.find(project);
  }
  // 通过状态获取项目列表
  private async findProjectsByStatus(status: ProjectStatus) {
    return this.dbService.project.find({ status });
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

  // 软删除
  // 仅仅将状态 status 改为 unlink
  async handleUnlink(uuid: string) {
    const result = await this.dbService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.unlink } },
      { multi: true }
    );
    this.logger.log(uuid, "软删除工程");
    return result;
  }

  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  async handleDelete(uuid: string) {
    const result = await this.dbService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.delete } },
      { multi: true }
    );
    this.logger.log(uuid, "删除工程");
    return result;
  }

  // 恢复工程
  async handleRevert(uuid: string) {
    const result = await this.dbService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.normal } },
      { multi: true }
    );
    this.logger.log(uuid, "恢复工程");
    return result;
  }
}
