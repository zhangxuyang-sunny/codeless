import { ComponentMaterial } from "../schemas/material";

// 创建组件物料参数
export interface CreateComponentMaterialParams {
  title: string;
  description?: string;
  tags?: string;
  previews?: string[];
  zipFile?: File;
}
// 更新组件物料参数
// 上传资源包，可选走服务器打包处理
// 上传组件 props、emits、listeners、slots 等信息用于配置设置器
export interface UpdateComponentMaterialParams {
  id: string;
  title?: string;
  description?: string;
  previews?: string[];
  zipFile?: File;
  setterOptions: ComponentMaterial["setterOptions"];
}

// 查询组件物料参数
export interface FindComponentMaterialParams {
  id?: string;
  title?: string;
  description?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
