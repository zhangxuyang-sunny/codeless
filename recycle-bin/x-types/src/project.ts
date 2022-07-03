export const enum ProjectStatus {
  normal = 1, // 正常状态
  unlink = -1, // 软删除
  delete = -2 // 自状态变为 -2 一定时间后，将会彻底从数据库移除
}

export interface IProjectViewLink {
  viewId: string;
  title: string;
  urlPath: string;
}

export interface IProjectRouter {
  base: string;
  // 路由模式
  mode: "hash" | "history" | "memory";
  // 路由页面
  views: Array<IProjectViewLink>;
}

export interface IProjectDataset {
  key: string;
  define: string;
}

// 项目数据
export interface IProjectSchema {
  id: string;
  version: string;
  status: ProjectStatus;
  createdUser: string;
  updatedUser: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  description: string;
  router: IProjectRouter;
  datasets: IProjectDataset[];
}

// 首次创建项目，服务端将会生成唯一 id 、初始版本
export interface ICreateProjectParams {
  title: string;
  description: string;
}

// 更新项目基本信息
export interface IUpdateProjectParams {
  id: string;
  title: string;
  description: string;
  router: IProjectRouter;
}

// 查找项目
export interface IQueryProjectsParams {
  id: string;
  title: string;
  status: ProjectStatus;
  createdUser: string;
  updatedUser: string;
  createdTimeRange: [number, number];
  updatedTimeRange: [number, number];
}
