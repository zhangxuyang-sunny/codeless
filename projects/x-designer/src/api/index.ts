import { ICreateViewParams, IFindViewsParams } from "packages/x-core/dist/types/view";
import { ICreateProjectParams } from "packages/x-core/dist/types/project";
import axios from "src/utils/axios";
import { IViewSchema } from "packages/x-core/dist/types/view";

/**
 * 创建view
 */
export async function createView(data: ICreateViewParams) {
  return axios<IViewSchema[]>({
    url: "/api/v1/view/create",
    method: "post",
    data
  });
}

/**
 * 创建项目
 */
export async function createProject(data: ICreateProjectParams) {
  return axios<IViewSchema[]>({
    url: "/api/v1/project/create",
    method: "post",
    data
  });
}

/**
 * 获取view列表
 */
export async function getViewList(data: Partial<IFindViewsParams>) {
  return axios<IViewSchema[]>({
    url: "/api/v1/view/list",
    method: "get",
    data
  });
}
