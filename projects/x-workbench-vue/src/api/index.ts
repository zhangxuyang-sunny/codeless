import axios from "./axios";
import type { TypeMaterialSchema } from "packages/x-types/material";

type TypeResponse<T> = {
  msg: string;
  data: T | null;
};
export const apiGetMaterials = async (ui: string, version: string) => {
  try {
    const { data } = await axios.get<TypeResponse<TypeMaterialSchema[]>>("api/component/list", {
      params: { ui, version }
    });
    return data;
  } catch {
    return { data: null, msg: "组件拉取失败！" };
  }
};

// 物料 ui 分类
export type TypeMaterialUICategory = {
  title: string;
  name: string;
  versions: string[];
};
export const apiGetMaterialUIList = async () => {
  try {
    const { data } = await axios.get<TypeResponse<TypeMaterialUICategory[]>>(
      "api/component/ui/list"
    );
    return data;
  } catch {
    return { data: null, msg: "UI库列表拉取失败" };
  }
};
