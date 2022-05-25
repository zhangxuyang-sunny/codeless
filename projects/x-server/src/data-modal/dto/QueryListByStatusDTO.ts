import { IsIn } from "class-validator";
import { ProjectStatus } from "src/business/project.service";

const statusString = [ProjectStatus.delete, ProjectStatus.normal, ProjectStatus.unlink].map(item =>
  String(item)
);

export class QueryListByStatusDTO {
  @IsIn(statusString, { message: `枚举值校验未通过 (${statusString})` })
  status: ProjectStatus;
}
