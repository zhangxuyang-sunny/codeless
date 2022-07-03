import { IsIn } from "class-validator";
import {
  IProjectSchema,
  IProjectRouter,
  IQueryProjectsParams,
  ICreateProjectParams,
  IProjectDataset
} from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}

// 持久化对象
export class ProjectSchemaPO implements IProjectSchema {
  id: string;
  version: string;
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
  status: ProjectStatus;
  title: string;
  description: string;
  router: IProjectRouter;
  datasets: IProjectDataset[];
}

export class ProjectSchemaVO extends ProjectSchemaPO {}

const statusString = [ProjectStatus.delete, ProjectStatus.normal, ProjectStatus.unlink];
export class QueryProjectDTO implements IQueryProjectsParams {
  id: string;
  title: string;
  @IsIn(statusString, { message: `status 校验未通过 (${statusString})` })
  status: ProjectStatus;
  createUser: string;
  updateUser: string;
  createTimeRange: [number, number];
  updateTimeRange: [number, number];
}
