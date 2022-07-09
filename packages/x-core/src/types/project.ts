import { ProjectStatus } from "../enums";
import { FunctionSchema, FunctionValue } from "../nodes";
import { WithDocument } from "./resource";
import { IView } from "./view";

// 路由中一个 view 配置项
// 通过 viewId 关联一个 view 数据实体
// 定义 urlPath 为路由映射
export interface IViewOption {
  viewId: string;
  title: string;
  urlPath: string;
}

// 路由配置项
// 路由映射了多个 view

export interface IRouterOption {
  base: string;
  // 路由模式
  mode: "hash" | "history" | "memory";
  // 路由页面
  views: Array<IViewOption>;
}

// 数据集定义数据
export interface IDatasetsSchema {
  key: string;
  define: FunctionSchema;
}

// 数据集返回数据
export interface IDatasets extends IDatasetsSchema, WithDocument {}

// 数据集消费数据
export interface IDatasetsConsumer {
  key: string;
  define: FunctionValue;
}

// 创建项目的请求参数
export interface ICreateProjectParams {
  title: string;
  description: string;
}

// 更新项目的请求参数
export interface IUpdateProjectParams {
  id: string;
  title?: string;
  version?: string;
  description?: string;
  router?: IRouterOption;
  datasets?: IDatasetsSchema[];
}

// 查找项目的请求参数
// 支持标题的模糊搜索、创建/更新人/时间区间搜索
export interface IFindProjectsParams {
  id?: string;
  title?: string;
  status?: ProjectStatus;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}

// 项目存储的实体数据
export interface IProjectSchema {
  id: string;
  title: string;
  version: string;
  status: ProjectStatus;
  description: string;
  router: IRouterOption;
  datasets: IDatasetsSchema[];
}

export interface IProject extends IProjectSchema, WithDocument {}

export interface IProjectConsumer {
  id: string;
  title: string;
  version: string;
  status: ProjectStatus;
  description: string;
  router: IRouterOption;
  datasets: IDatasetsConsumer[];
}

// ProjectWithResource 即：应用数据 application
// 一个 application 是一个 project 的关联数据聚合，项目中关联着多个 view 和 dataset
// application 和 project 数据的区别就是：
// application 的数据包会包含 project 所关联的 views 和 datasets
export interface IProjectWithResource {
  project: IProject;
  views: IView[];
  datasets: IDatasets[];
}
