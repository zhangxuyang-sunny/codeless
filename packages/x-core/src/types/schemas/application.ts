import { JSExpression, JSFunction } from "./js-value";
// 渲染器运行时协议

/**
 * 应用协议：描述一个应用
 */
export interface ApplicationSchema {
  id: string;
  // /**
  //  * 储存平台上下文实例
  //  */
  // context: {
  //   datasets: Record<string, unknown>;
  // };
  /**
   * 路由配置
   * @vue https://router.vuejs.org/zh/
   * @TODO 其他前端框架路由解析实现
   */
  router: {
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
    meta?: Record<string, any>;
  };
  /**
   * 页面列表
   * 页面的视图层由一个组件构成
   */
  pages: Array<{
    /**
     * 页面运行时名称
     */
    name: string;
    /**
     * 页面路由路径
     */
    path: string;
    /**
     * 页面渲染的组件
     */
    component: ComponentSchema;
  }>;
  /**
   * 数据集列表
   */
  datasets: DatasetSchema[];
}

/**
 * 物料组件协议：描述如何使用一个物料组件
 * 包括使用什么物料组件、以及传入对应的属性、样式、事件等配置
 * 组件和组件物料的关系是：组件由组件物料组合而成
 */
export interface ComponentSchema {
  id: string;
  /**
   * 组件物料地址
   */
  src: string;
  /**
   * 组件属性
   */
  props: Record<string, JSExpression | JSFunction>;
  /**
   * 组件样式类名
   */
  className: JSExpression | string;
  /**
   * css 样式
   */
  css: string;
  /**
   * 组件内联样式
   */
  style: JSExpression | Record<keyof CSSStyleDeclaration, JSExpression>;
  // style: JSExpression | { [x in keyof CSSStyleDeclaration]: JSExpression };
  /**
   * 组件发射事件
   */
  emits: Array<{
    /**
     * 事件名
     */
    event: string;
    /**
     * 触发目标事件，格式为：组件唯一标识:事件
     * @eg Spin_1:loading_toggle，Spin_1 的 listener 将会监听 loading_toggle，Spin_1 事件
     */
    target: string[];
    /**
     * 可以触发函数
     */
    invoke: JSFunction;
  }>;
  /**
   * 组件监听
   */
  listeners: Array<{
    /**
     * 监听的事件名
     */
    event: string;
    /**
     * 触发自身的事件名
     */
    target: string;
  }>;
  /**
   * 默认插槽和具名插槽
   * 支持具名插槽，在不同的前端框架有不同的解析方式
   * 如在 react 中应被解析为 props 传入
   */
  slots: Partial<{
    /**
     * vue 默认插槽，对应 react 为 props.children
     */
    default: ComponentSchema[];
    /**
     * vue 具名插槽，对应 react 为 props.{name} hoc
     */
    [slotName: string]: ComponentSchema[];
  }>;
}

/**
 * 数据集协议：描述一个原子数据集
 */
export interface DatasetSchema {
  id: string;
  /**
   * 支持多种状态库，目前只实现了 pinia
   * @TODO 支持更多状态管理 "vuex" | "redux" | "mobx" | "vue-composition" | "react-hook"
   */
  type: "pinia";
  /**
   * 数据集运行时名称
   * @eg name: "aa"， dataset.aa.loading
   */
  name: string;
  /**
   * 定义数据集的方法
   */
  define: JSFunction | JSExpression;
}
