import { IMaterialConsumer, IMaterialOption } from "./material";

// 视图：使用原子物料组合而成的复合物料，可在个人/团队/命名空间下共享
export interface IViewSchema {
  id: string;
  version: string;
  title: string;
  description: string;
  createdUser: string;
  updatedUser: string;
  createdAt: number;
  updatedAt: number;
  schema: IMaterialOption;
}

// 创建视图参数
export interface ICreateViewParams {
  appId: string;
  title: string;
  description: string;
}

// 更新视图参数
export interface IUpdateViewParams {
  id: string;
  title: string;
  description: string;
  schema: IMaterialOption;
}

// 查询视图参数
export interface IQueryViewParams {
  id: string;
  title: string;
  description: string;
  createdUser: string;
  updatedUser: string;
  createdTimeRange: [number, number];
  updatedTimeRange: [number, number];
}

export interface IViewConsumer {
  id: string;
  version: string;
  title: string;
  description: string;
  createdUser: string;
  updatedUser: string;
  createdAt: number;
  updatedAt: number;
  schema: IMaterialConsumer;
}
