import type { ConstructorOptions } from "eventemitter2";

import { AbstractSchemaBuilder } from "./AbstractSchemaBuilder";
import type { Store } from "./dataset";
import type { Expression } from "./expression";
import type { Page } from "./page";
import { type Router, RouterBuilder, RouterMode } from "./router";
/**
 * 云函数集合
 */
export type FunctionRef = { key: string; src: string };

/**
 * 表达式集合
 */
export type ExpressionRef = { key: string; expression: Expression };

/**
 * 应用协议
 * 描述一个应用的所有配置
 */
export type Application = {
  /**
   * 协议版本
   */
  version: string;
  /**
   * 约定框架
   */
  framework: "vue" | "react";
  /**
   * 数据集列表
   */
  stores: Store[];
  /**
   * 路由
   */
  router: Router;
  /**
   * 页面列表
   */
  pages: Page[];
  /**
   * 全局监听事件
   */
  listeners: Array<{
    /**
     * 事件名
     */
    event: string;
    /**
     * 触发事件列表
     */
    target: TargetEvent[];
    /**
     * 触发函数
     */
    invoke: Expression | null;
    /**
     * 触发一次
     */
    once: boolean;
  }>;
  eventsOptions: ConstructorOptions;
  /**
   * 云函数列表
   * 放入池子用于逻辑复用
   */
  functions: FunctionRef[];
  /**
   * 表达式列表
   * 所有的流指令流程都统一管理，调用处使用 id 进行关联
   */
  expressions: ExpressionRef[];
};

export type TargetEvent = {
  /**
   * @format 组件唯一标识:事件
   * @eg Spin_1:loading_toggle，Spin_1 的 listener 将会监听 loading_toggle，Spin_1 事件
   */
  event: string;
  /**
   * 传递参数
   */
  params: Expression | null;
};

export type ApplicationListeners = Application["listeners"];
export type ApplicationListener = ApplicationListeners[number];

export class ApplicationBuilder extends AbstractSchemaBuilder<Application> {
  constructor(schema?: Application) {
    super(
      schema ?? {
        version: "0",
        framework: "vue",
        stores: [],
        router: new RouterBuilder().end(),
        pages: [],
        listeners: [],
        eventsOptions: {
          /**
           * 每个组件都一定会注册到事件系统，默认给无限制
           * @TODO  Infinity or Number.MAX_VALUE ?
           */
          maxListeners: Infinity
        },
        functions: [],
        expressions: []
      }
    );
  }
  setFramework(framework: Application["framework"]) {
    this.schema.framework = framework;
    return this;
  }
  setRouterMode(mode: RouterMode) {
    this.schema.router = new RouterBuilder().set("mode", mode).end();
    return this;
  }
  addStore(schema: Store) {
    this.schema.stores.push(schema);
    return this;
  }
  addPage(page: Page) {
    this.schema.pages.push(page);
    return this;
  }
  addListener(listener: ApplicationListener) {
    this.schema.listeners.push(listener);
    return this;
  }
  addListeners(listeners: ApplicationListener[]) {
    this.schema.listeners.push(...listeners);
    return this;
  }
  addCloudFunction(key: string, src: string) {
    this.schema.functions.push({ key, src });
    return this;
  }
}
