import { v4 as uuidV4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { ProjectSchema } from "packages/x-nodes";
import { DatabaseService } from "src/services/database.service";
import { ProjectVO } from "src/data-modal/vo/ProjectVO";

export const enum ProjectStatus {
  normal = 1, // 正常状态
  unlink = -1, // 软删除
  delete = -2 // 自状态变为 -2 一定时间后，将会彻底从数据库移除
}

@Injectable()
export class ProjectService {
  constructor(private readonly dbService: DatabaseService) {}

  // 保证 uuid 不重复
  private async generateUuid() {
    let isValid = false;
    let uuid = uuidV4();
    while (!isValid) {
      if ((await this.dbService.project.count({ uuid })) === 0) {
        isValid = true;
        break;
      }
      uuid = uuidV4();
    }
    return uuid;
  }

  // 创建工程，生成 uuid
  async createProject(project: ProjectSchema) {
    const result = await this.dbService.project.insert({
      uuid: await this.generateUuid(),
      ...project,
      status: ProjectStatus.normal
    });
    return result;
  }

  // 使用 uuid 查找工程
  async findProjectByUUID(uuid: string) {
    return this.dbService.project.findOne({ uuid });
  }

  // 条件查找工程
  async findProjectsBy(project: Partial<ProjectVO>) {
    // Get query 中 number 转换
    project.status = Number(project.status);
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
    return result;
  }

  // 恢复工程
  async handleRevert(uuid: string) {
    const result = await this.dbService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.normal } },
      { multi: true }
    );
    return result;
  }
}
