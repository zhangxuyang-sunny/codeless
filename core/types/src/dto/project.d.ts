import { ProjectStatus } from "../enums";
import { TypePageConfig, TypeProjectConfig } from "../manager";
/**
 * 创建应用的请求参数
 */
export interface ICreateProjectParams {
    title: string;
    description: string;
}
/**
 * 更新应用的请求参数
 */
export interface IUpdateProjectParams {
    id: string;
    version?: string;
    title?: string;
    description?: string;
    status?: ProjectStatus;
    config?: TypeProjectConfig;
}
/**
 * 查找应用的请求参数
 * 支持标题的模糊搜索、创建/更新人/时间区间搜索
 */
export interface IFindProjectsParams {
    id?: string;
    title?: string;
    status?: ProjectStatus;
    createdUser?: string;
    updatedUser?: string;
    createdTimeRange?: [number, number];
    updatedTimeRange?: [number, number];
}
/**
 * 更新项目的页面
 */
export interface IUpdatePagesParams {
    id: string;
    pages: TypePageConfig[];
}
