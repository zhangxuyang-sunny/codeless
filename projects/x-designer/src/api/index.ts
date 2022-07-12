import { ICreateViewParams, IFindViewsParams } from "packages/x-core/dist/types/view";
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
 * 获取view列表
 */
export async function getViewList(data: Partial<IFindViewsParams>) {
  return axios<IViewSchema[]>({
    url: "/api/v1/view/list",
    method: "get",
    data
  });
}
