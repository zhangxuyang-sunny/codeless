import { ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectStatus } from "packages/x-core/src/enums";
import { IUpdateProjectParams } from "packages/x-core/src/types/dto/project";
import { ProjectConfig } from "../entities/project.entity";

export class UpdateProjectDTO implements IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  @ApiPropertyOptional({ type: Number })
  status?: ProjectStatus;
  config?: ProjectConfig;
}
