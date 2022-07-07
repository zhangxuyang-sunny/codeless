import {
  IFindProjectsParams,
  ICreateProjectParams,
  IUpdateProjectParams,
  IRouterOption,
  IDatasetsSchema
} from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}

export class UpdateProjectDTO implements IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  router?: IRouterOption;
  datasets?: IDatasetsSchema[];
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
