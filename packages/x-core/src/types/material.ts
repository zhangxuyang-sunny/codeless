import type { TypeMaterialPropOption } from "./setters";
import { ObjectSchema } from "../nodes";

// 物料相关定义数据描述协议
// 物料定义包含不仅限于：物料元信息、物料配置选项
export interface IMaterialSlotOption {
  title: string;
  description: string;
  name: string;
}

export interface IMaterialEmitOption {
  title: string;
  description: string;
  name: string;
}

export interface IMaterialListenerOption {
  title: string;
  description: string;
  name: string;
}

// 物料选项信息
export interface IMaterialOption {
  props: TypeMaterialPropOption[];
  slots: IMaterialSlotOption[];
  emits: IMaterialEmitOption[];
  listeners: IMaterialListenerOption[];
}

// 物料在商城中流通的描述
export type TypeMaterial = {
  id: string;
  url: string;
  code?: string;
  title: string;
  description: string;
  name: string;
  image: string;
  category?: string;
  // 可配置选项
  options: IMaterialOption;
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

// 创建一个物料参数，需要上传源码，走服务器打包
// 上传组件 props、emits、listeners、slots 等信息用于配置设置器
export interface ICreateMaterialParams {
  title: string;
  description: string;
  props: TypeMaterialPropOption;
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

// 物料参数描述数据
export interface IMaterialOptionSchema {
  id: string;
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
  slots: Record<string, IMaterialOptionSchema[]>;
}

// export type MaterialTarget = string[];
// | [MaterialEvent, (...args: unknown[]) => unknown]

// 物料参数消费数据
export interface IMaterialOptionConsumer {
  id: string;
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
    default: IMaterialOptionConsumer[];
    [x: string]: IMaterialOptionConsumer[];
  }>;
}
