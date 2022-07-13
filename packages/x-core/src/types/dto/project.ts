import { ApplicationStatus } from "../../enums";
import { ApplicationConfig } from "../manager";

// 创建项目的请求参数
export interface CreateProjectParams {
  title: string;
  description: string;
}

// 更新项目的请求参数
export interface UpdateProjectParams {
  id: string;
  version?: string;
  status?: ApplicationStatus;
  schema?: ApplicationConfig;
}

// 查找项目的请求参数
// 支持标题的模糊搜索、创建/更新人/时间区间搜索
export interface FindProjectsParams {
  id?: string;
  title?: string;
  status?: ApplicationStatus;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
