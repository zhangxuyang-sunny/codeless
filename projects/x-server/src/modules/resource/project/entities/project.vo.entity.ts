import { ApiProperty } from "@nestjs/swagger";
import { ComponentStatus, ProjectStatus } from "packages/x-core/src/enums";
import { IMetaData, IProjectConfigData } from "packages/x-core/src/types/manager";
import { ProjectConfig } from "./project.entity";

export class MetaDataVO implements IMetaData {
  id: string;
  title: string;
  description: string;
  version: string;
  @ApiProperty({ type: Number })
  status: ProjectStatus | ComponentStatus;
  createdAt: string;
  updatedAt: string;
  createdUser: string;
  updatedUser: string;
}

/**
 * 项目配置数据
 */
export class ProjectConfigVO extends MetaDataVO implements IProjectConfigData {
  @ApiProperty({ type: ProjectConfig })
  config: ProjectConfig;
}
