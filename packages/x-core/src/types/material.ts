import type { TypeMaterialPropOptions } from "./setters";
import { ObjectSchema } from "../nodes";

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
  code?: string;
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

// 原子物料：一个用原生开发并打包后的组件，可在物料商城中流通
export interface IMaterialDefinition {
  id: string;
  title: string;
  description: string;
  src: string;
  props: TypeMaterialPropOptions;
}

// 创建一个物料参数，需要上传源码，走服务器打包
// 上传组件 props、emits、listeners、slots 等信息用于配置设置器
export interface ICreateMaterialParams {
  title: string;
  description: string;
  props: TypeMaterialPropOptions;
  // TODO
  listeners: unknown[];
  emits: unknown[];
  slots: unknown;
  zipFile: string;
}

// 更新物料
export interface IUpdateMaterialParams extends ICreateMaterialParams {
  id: string;
}

// 物料持久化数据
export interface IMaterialSchema {
  src: string;
  props: ObjectSchema;
  style: ObjectSchema;
  emits: Array<{
    event: string;
    target: string[]; // | [MaterialEvent, FunctionSchema];
    // invoke?: FunctionSchema;
  }>;
  listeners: Array<{
    event: string;
    origin: string;
  }>;
  slots: Record<string, IMaterialSchema[]>;
}

export type MaterialTarget = string[];
// | [MaterialEvent, (...args: unknown[]) => unknown]

// 物料消费数据
export interface IMaterialConsumer {
  src: string;
  style: Partial<CSSStyleDeclaration>;
  props: Partial<{
    if: unknown;
    show: unknown;
    hidden: unknown;
    [x: string]: unknown;
  }>;
  emits: Array<{
    event: string;
    target: string[];
    // invoke?: (...args: unknown[]) => unknown;
  }>;
  listeners: Array<{
    event: string;
    origin: string;
  }>;
  slots: Partial<{
    default: IMaterialConsumer[];
    [x: string]: IMaterialConsumer[];
  }>;
}
