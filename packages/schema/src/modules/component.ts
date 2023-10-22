import { EmitOption, ListenerOption, PropOption, SlotOption } from "../setters";
import { ModuleTypes } from "./type-enums";

/**
 * 组件模块：组件是现代前端构成界面的主要单元，组件也是一种模块
 */
export type ComponentModule = {
  type: ModuleTypes.component;
  /**
   * 组件模块
   */
  title: string;
  /**
   * 组件模块描述
   */
  description: string;
  /**
   * 组件模块代码地址
   */
  src: string;
  /**
   * 预览图列表
   */
  snapshots: string[];
  /**
   * 配置设置器选项
   */
  options: {
    /**
     * 属性设置器配置列表
     */
    props: PropOption[];
    /**
     * 事件监听列表
     */
    listeners: ListenerOption[];
    /**
     * 事件发射列表
     */
    emits: EmitOption[];
    /**
     * 插槽列表
     */
    slots: SlotOption[];
  };
};
