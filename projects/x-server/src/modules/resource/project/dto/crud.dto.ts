import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectStatus } from "packages/x-core/src/enums";
import {
  ICreateProjectParams,
  IFindProjectsParams,
  IUpdateProjectParams
} from "packages/x-core/src/types/dto/project";
import { DatasetConfig, PageConfig, RouterConfig } from "packages/x-core/src/types/manager";

class Config {
  @ApiProperty({ type: Object })
  router: RouterConfig;
  @ApiProperty({ type: Object })
  datasets: DatasetConfig[];
  @ApiProperty({ type: Object })
  pages: PageConfig[];
}

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}

export class UpdateProjectDTO implements IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  @ApiPropertyOptional({ type: Number })
  status?: ProjectStatus;
  @ApiPropertyOptional({ type: () => Config })
  config?: {
    router: RouterConfig;
    datasets: DatasetConfig[];
    pages: PageConfig[];
  };
}

// const statusString = [ProjectStatus.normal, ProjectStatus.unlink, ProjectStatus.delete];
export class FindProjectDTO implements IFindProjectsParams {
  id?: string;
  title?: string;
  // @IsIn(statusString, { message: `status 校验未通过 (${statusString})` })
  status?: ProjectStatus;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}

export class PageConfigDTO implements PageConfig {
  id: string;
  component: {
    id: string;
    version: string;
  };
  title: string;
  name: string;
  path: string;
}

/**
 * 更新项目中页面配置
 */
export class UpdatePagesDTO {
  id: string;
  pages: PageConfigDTO[];
}
