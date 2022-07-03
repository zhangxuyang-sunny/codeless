import { IViewOption } from "packages/x-core/src/types/project";
import { IMaterialSchema } from "packages/x-core/src/types/material";
import {
  ICreateViewParams,
  IFindViewsParams,
  IUpdateViewParams
} from "packages/x-core/src/types/view";
import { ViewPO } from "./view.schema";

export class ViewVO extends ViewPO {}

// 创建页面参数
export class CreateViewDTO implements ICreateViewParams {
  projectId: string;
  title: string;
  description: string;
  material: IMaterialSchema;
}

export class UpdateViewDTO implements IUpdateViewParams {
  id: string;
  title?: string;
  description?: string;
  viewOptions?: IViewOption[];
  schema?: IMaterialSchema;
}

export class FindViewsDTO implements IFindViewsParams {
  id?: string;
  title?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
