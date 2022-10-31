import {
  Application,
  ApplicationListener,
  Component,
  ComponentEvent,
  Dataset,
  Page,
  TargetEvent
} from "@economizer/schema";
import { DefineStoreOptions, StateTree } from "pinia";

/**
 * vue 渲染器运行时协议
 * 通过 Application 转换而来的私有协议
 * 这里重写协议中所需要转换成运行时的数据类型
 */

export interface ApplicationRuntime
  extends Omit<
    Application,
    | "pages" //
    | "datasets"
    | "listeners"
  > {
  context: Context;
  pages: PageRuntime[];
  datasets: DatasetRuntime[];
  listeners: ListenerRuntime[];
}

export interface Context {
  /**
   * @TODO pinia 类型
   */
  datasets: Record<string, unknown>;
  /**
   * 当前事件参数
   */
  current: unknown;
}

export interface PageRuntime
  extends Omit<
    Page, //
    "component"
  > {
  component: ComponentRuntime;
}

export interface ComponentRuntime
  extends Omit<
    Component,
    | "props" //
    | "className"
    | "style"
    | "events"
    | "slots"
  > {
  /**
   * @TODO 响应式 reactive 类型
   */
  props: Record<string, unknown>;
  /**
   * @TODO 响应式 ref 类型
   */
  className: string;
  /**
   * @TODO 响应式 reactive 类型
   */
  style: Partial<CSSStyleDeclaration>;
  events: {
    [x: string]: EventRuntime;
  };
  slots: Partial<{
    default: ComponentRuntime[];
    [slotName: string]: ComponentRuntime[];
  }>;
}

export interface EventRuntime
  extends Omit<
    ComponentEvent,
    | "target" //
    | "invoke"
  > {
  target: TargetEventRuntime[];
  invoke: ((...args: unknown[]) => unknown) | null;
}

export interface ListenerRuntime
  extends Omit<
    ApplicationListener,
    | "target" //
    | "invoke"
  > {
  target: TargetEventRuntime[];
  invoke: ((...args: unknown[]) => unknown) | null;
}

export interface TargetEventRuntime
  extends Omit<
    TargetEvent, //
    "params"
  > {
  // 表达式或者函数
  params: unknown | ((...args: unknown[]) => unknown) | null;
}

/**
 * @TODO 是否需要实现多种状态管理
 */
export interface DatasetRuntime extends Omit<Dataset, "define"> {
  define: () => DefineStoreOptions<string, StateTree, unknown, unknown>;
}
