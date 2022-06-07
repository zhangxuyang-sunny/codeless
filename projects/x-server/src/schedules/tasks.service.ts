import type { ProjectVO } from "src/data-modal/vo/ProjectVO";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProjectStatus } from "src/business/project.service";
import { DatabaseService } from "src/services/database.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  // 10分钟清理一次
  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: "定时清除被标记为 delete 的工程"
  })
  async clearDeletedProject() {
    const willDeleteProjects = await this.databaseService.project //
      .find<ProjectVO>({ status: ProjectStatus.delete });
    const logList: ProjectVO[] = [];
    // 构建清除队列，将大于给定时间被标记为 delete 的工程从数据库中删除
    const TIMEOUT = 1000 * 10;
    const queue = willDeleteProjects.flatMap(item => {
      if (new Date().getTime() - item.updatedAt.getTime() > TIMEOUT) {
        logList.push(item);
        return [this.databaseService.project.remove({ uuid: item.pid }, { multi: true })];
      }
      return [];
    });
    await Promise.all(queue);
    this.logger.verbose(
      `执行清除大于 ${TIMEOUT}s 被标记为 delete 的工程：${logList.map(_ => _.pid).join("\n")} (${
        logList.length
      }个)`
    );
  }
}
