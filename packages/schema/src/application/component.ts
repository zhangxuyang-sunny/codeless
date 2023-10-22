import { AbstractSchemaBuilder } from "./AbstractSchemaBuilder";
import type { TargetEvent } from "./application";
import type { Expression } from "./expression";

/**
 * 组件协议
 * 描述如何使用一个组件
 * 包括使用什么模块组件、以及传入对应的属性、样式、事件等配置
 * 组件和组件模块的关系是：组件由组件模块组合而成
 */
export type Component = {
  /**
   * 应用级别内的唯一id
   */
  id: string;
  /**
   * 组件地址
   */
  src: string;
  /**
   * 属性
   */
  props: Record<string, Expression>;
  /**
   * 内联样式
   */
  style: Expression | null;
  /**
   * 组件样式类名
   */
  className: Expression | null;
  /**
   * @TODO append 到 script.head 中
   * css 样式
   */
  css: Expression | null;
  /**
   * 默认插槽和具名插槽
   * 支持具名插槽，在不同的前端框架有不同的解析方式
   * 如在 react 中应被解析为 props 传入
   */
  slots: Partial<{
    /**
     * vue 默认插槽，对应 react 为 props.children
     */
    default: Component[];
    /**
     * vue 具名插槽，对应 react 为 props.{name} hoc
     */
    [slotName: string]: Component[];
  }>;

  /**
   * 组件事件（事件总线）
   */
  events: Array<{
    name: string;
    /**
     * 触发目标事件列表
     */
    target: TargetEvent[];
    /**
     * 触发函数
     */
    invoke: Expression | null;
  }>;
};

export type ComponentEvent = Component["events"][number];

export class ComponentSchemaBuilder extends AbstractSchemaBuilder<Component> {
  constructor(schema?: Component) {
    super(
      schema ?? {
        id: "",
        src: "",
        props: {},
        style: null,
        className: null,
        css: null,
        slots: {},
        events: []
      }
    );
  }
  setId(id: string) {
    this.schema.id = id;
    return this;
  }
  setSrc(src: string) {
    this.schema.src = src;
    return this;
  }
  addEvent(event: ComponentEvent) {
    this.schema.events.push(event);
    return this;
  }
  setSlots(name: string, slot: Component[]) {
    this.schema.slots[name] = slot;
    return this;
  }
}
