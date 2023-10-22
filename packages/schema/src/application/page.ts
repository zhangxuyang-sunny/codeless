import { Component } from "./component";

/**
 * 页面的视图层由一个组件构成
 */
export type Page = {
  meta: {
    title: string;
    [x: string]: string;
  };
  /**
   * 页面路由路径
   */
  path: string;
  /**
   * 页面渲染的组件
   */
  component: Component;
};
