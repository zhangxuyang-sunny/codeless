import { AbstractSchemaBuilder } from "./AbstractSchemaBuilder";

/**
 * 路由协议
 * @TODO 不同前端框架路由各平台渲染器解析实现
 * @vue https://router.vuejs.org/zh/
 */
export type Router = {
  /**
   * 基础路径
   */
  base: string;
  /**
   * 路由历史记录模式
   * @doc https://router.vuejs.org/zh/guide/essentials/history-mode.html
   */
  mode: "hash" | "history" | "memory";
  /**
   * 路由元信息
   * @doc https://router.vuejs.org/zh/guide/advanced/meta.html
   */
  meta?: Record<string, unknown>;
};

export type RouterMode = Router["mode"];

export class RouterBuilder extends AbstractSchemaBuilder<Router> {
  constructor(schema?: Router) {
    super(
      schema ?? {
        base: "",
        mode: "hash",
        meta: {}
      }
    );
  }
}
