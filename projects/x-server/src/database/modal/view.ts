import { IProjectViewLink } from "packages/x-core/src/types/project";
import { IMaterialSchema } from "packages/x-core/src/types/material";
import { ICreateViewParams, IViewSchema } from "packages/x-core/src/types/view";

// 创建页面参数
export class CreateViewDTO implements ICreateViewParams {
  appId: string;
  title: string;
  description: string;
  material: IMaterialSchema;
}

export class ViewPO implements IViewSchema {
  id: string;
  version: string;
  title: string;
  description: string;
  createUser: string;
  updateUser: string;
  createdAt: string;
  updatedAt: string;
  schema: IMaterialSchema;
}

export class ViewVO extends ViewPO {}

export class UpdateViewsDTO {
  appId: string;
  viewOptions: IProjectViewLink[];
}

export class QueryViewDTO {
  pageId: string;
  title: string;
  createUser: string;
  updateUser: string;
  createTimeRange: [number, number];
  updateTimeRange: [number, number];
}
