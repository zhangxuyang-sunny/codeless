import { ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectStatus } from "@lowcode/types";
import { IUpdateProjectParams } from "@lowcode/types";
import { ProjectConfig } from "./project.entity";

export class UpdateProjectDTO implements IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  @ApiPropertyOptional({ type: Number })
  status?: ProjectStatus;
  config?: ProjectConfig;
}
