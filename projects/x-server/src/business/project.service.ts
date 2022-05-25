import { v4 as uuidV4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { ProjectSchema } from "packages/x-nodes";
import { DatabaseService } from "src/database.service";

export type ProjectVO = ProjectSchema & {
  uuid: string;
  status: ProjectStatus;
};

export const enum ProjectStatus {
  normal = 1, // 正常状态
  unlink = -1, // 软删除
  delete = -2 // 自状态变为 -2 一定时间后，将会彻底从数据库移除
}

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}
  // 保证 uuid 不重复
  private async generateUuid() {
    let isAllow = false;
    let uuid = uuidV4();
    while (!isAllow) {
      const repeat = await this.databaseService.project.count({ uuid });
      if (repeat === 0) {
        isAllow = true;
        break;
      }
      uuid = uuidV4();
    }
    return uuid;
  }
  // 获取正常状态的工程列表
  async getNormalList() {
    return this.databaseService.project.find({ status: ProjectStatus.normal });
  }
  // 创建工程，生成 uuid
  async create(project: ProjectSchema) {
    const uuid = await this.generateUuid();
    const result = await this.databaseService.project.insert<ProjectVO>({
      uuid,
      ...project,
      status: ProjectStatus.normal
    });
    return result;
  }
  // 使用 uuid 查找工程
  async findByUUID(uuid: string) {
    return this.databaseService.project.findOne<ProjectVO>({ uuid });
  }
  // 条件查找工程
  async findListByQuery(project: Partial<ProjectVO>) {
    // Get query 中 number 转换
    project.status = Number(project.status);
    return this.databaseService.project.find<ProjectVO>(project);
  }
  // 查找 unlink 的工程，可用于回收站查询
  async findUnlink() {
    return this.databaseService.project.find<ProjectVO>({
      status: ProjectStatus.unlink
    });
  }
  // 查找 delete 的工程，用于后门查询
  async findDelete() {
    return this.databaseService.project.find<ProjectVO>({
      status: ProjectStatus.delete
    });
  }
  // 软删除
  // 仅仅将状态 status 改为 unlink
  async unlinkProject(uuid: string) {
    const result = await this.databaseService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.unlink } },
      { multi: true }
    );
    return result;
  }
  // 硬删除
  // 将状态 status 改为 delete，暂定保留一周后定时任务清除
  async deleteProject(uuid: string) {
    const result = await this.databaseService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.delete } },
      { multi: true }
    );
    return result;
  }
  // 恢复工程
  async revertProject(uuid: string) {
    const result = await this.databaseService.project.update<ProjectVO>(
      { uuid },
      { $set: { status: ProjectStatus.normal } },
      { multi: true }
    );
    return result;
  }
}
