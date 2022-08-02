import axios from "src/utils/axios";
import {
  IComponentData,
  IProjectConfigData,
  ICreateProjectParams,
  ICreateComponentParams,
  IFindComponentParams
} from "@lowcode/types";

/**
 * 创建组件
 */
export async function createComponent(data: ICreateComponentParams) {
  return axios<IComponentData>({
    url: "/api/v1/component/create",
    method: "post",
    data
  });
}

/**
 * 创建项目
 */
export async function createProject(data: ICreateProjectParams) {
  return axios<IProjectConfigData>({
    url: "/api/v1/project/create",
    method: "post",
    data
  });
}

/**
 * 获取 component 列表
 */
export async function getComponentList(data: Partial<IFindComponentParams>) {
  return axios<IComponentData[]>({
    url: "/api/v1/component/list",
    method: "get",
    data
  });
}
