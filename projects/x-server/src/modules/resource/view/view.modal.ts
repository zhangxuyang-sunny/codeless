import { IViewOption } from "packages/x-core/src/types/project";
import { IMaterialParamsSchema } from "packages/x-core/src/types/material";
import {
  ICreateViewParams,
  IFindViewsParams,
  IUpdateViewParams
} from "packages/x-core/src/types/view";

// 创建页面参数
export class CreateViewDTO implements ICreateViewParams {
  projectId: string;
  title: string;
  description: string;
  material: IMaterialParamsSchema;
}

export class UpdateViewDTO implements IUpdateViewParams {
  id: string;
  title?: string;
  description?: string;
  viewOptions?: IViewOption[];
  schema?: IMaterialParamsSchema;
}

export class FindViewsDTO implements IFindViewsParams {
  id?: string;
  title?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
