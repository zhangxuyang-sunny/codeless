import {
  IFindProjectsParams,
  ICreateProjectParams,
  IUpdateProjectParams
} from "packages/x-core/src/types/dto/project";
import { ProjectStatus } from "packages/x-core/src/enums";
import { DatasetConfig, RouterConfig } from "packages/x-core/src/types/manager";

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}

export class UpdateProjectDTO implements IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  router?: RouterConfig;
  datasets?: DatasetConfig[];
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
