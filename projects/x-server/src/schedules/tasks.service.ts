import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProjectStatus } from "packages/x-core/src/enums";
import { ProjectSchemaVO } from "../modules/resource/project.modal";
import { TableProjectService } from "../modules/resource/project.table.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly tbProjectService: TableProjectService) {}

  // 10分钟清理一次
  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: "定时清除被标记为 delete 的应用"
  })
  async clearDeletedProjects() {
    const willDeleteProjects = await this.tbProjectService //
      .findProjectsBy({ status: ProjectStatus.delete });
    const logList: ProjectSchemaVO[] = [];
    // 构建清除队列，将大于给定时间被标记为 delete 的工程从数据库中删除
    const TIMEOUT = 1000 * 10;
    const queue = willDeleteProjects.flatMap(item => {
      if (new Date().getTime() - new Date(item.updatedAt).getTime() > TIMEOUT) {
        logList.push(item);
        return [this.tbProjectService.deleteProjectById(item.id)];
      }
      return [];
    });
    await Promise.all(queue);
    this.logger.verbose(
      `执行清除大于 ${TIMEOUT}s 被标记为 delete 的工程：${logList.map(_ => _.id).join("\n")} (${
        logList.length
      }个)`
    );
  }
}
