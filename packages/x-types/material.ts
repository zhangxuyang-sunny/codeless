import type { TypeMaterialPropOptions } from "./setters";

// 物料相关定义数据描述协议
// 物料定义包含不仅限于：物料元信息、物料配置选项
export type TypeMaterialSlotSchema = {
  title: string;
  name: string;
  description: string;
};

export type TypeMaterialEmitSchema = {
  title: string;
  description: string;
  name: string;
};

export type TypeMaterialListenerSchema = {
  title: string;
  description: string;
  name: string;
};

// 物料选项信息
export type TypeMaterialOptions = {
  props: TypeMaterialPropOptions[];
  slots: TypeMaterialSlotSchema[];
  emits: TypeMaterialEmitSchema[];
  listeners: TypeMaterialListenerSchema[];
};

// 物料元信息
export type TypeMaterialMeta = {
  title: string;
  description: string;
  name: string;
  image: string;
  category?: string;
};

// 物料描述协议
export type TypeMaterialSchema = {
  $schema?: string;
  url: string;
  meta: TypeMaterialMeta;
  options: TypeMaterialOptions;
  /**
   * 1 内置组件
   * 2 自定义组件
   */
  type: 1 | 2;
  /**
   * 是否为收藏
   */
  collection: boolean;
};
