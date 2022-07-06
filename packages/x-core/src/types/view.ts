import { WithDocument } from "./resource";
import { IMaterialConsumer, IMaterialSchema } from "./material";

export interface IViewVO extends IViewSchema, WithDocument {}

// 视图持久化数据
export interface IViewSchema {
  id: string;
  version: string;
  title: string;
  description: string;
  schema: IMaterialSchema;
}

// 视图运行消费数据
export interface IViewConsumer {
  id: string;
  version: string;
  title: string;
  description: string;
  schema: IMaterialConsumer;
}

// 创建视图参数
export interface ICreateViewParams {
  projectId: string;
  title: string;
  description: string;
}

// 更新视图参数
export interface IUpdateViewParams {
  id: string;
  version?: string;
  title?: string;
  description?: string;
  schema?: IMaterialSchema;
}

// 查询视图参数
export interface IFindViewsParams {
  id?: string;
  title?: string;
  description?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
