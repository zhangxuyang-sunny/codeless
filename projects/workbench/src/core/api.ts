import { FindProjectsParams, ProjectConfigData } from "@codeless/types";
import { AxiosResponse } from "axios";

import { httpV1 } from "./http";

function responseFilter<T>(response: AxiosResponse<{ data: T }>) {
  if (response.status === 200) return response.data.data;
  throw new Error("请求失败");
}

export const apiGetProjectList = async (query: FindProjectsParams) => {
  return httpV1
    .get<{ data: ProjectConfigData[] }>("project/list", { data: query })
    .then(responseFilter);
};
