import {
  ApplicationSchema,
  ComponentSchema,
  DatasetSchema
} from "packages/x-core/src/types/schemas/application";

/**
 * vue 渲染器运行时协议
 * 通过 ApplicationSchema 转换而来的私有协议
 * 这里重写协议中所需要转换成运行时的数据类型
 */

export interface ApplicationRuntime extends Omit<ApplicationSchema, "pages" | "datasets"> {
  context: {
    /**
     * @TODO pinia 类型
     */
    datasets: Record<string, unknown>;
  };
  pages: Array<
    Omit<ApplicationSchema["pages"][number], "component"> & {
      component: ComponentRuntime;
    }
  >;
  datasets: DatasetRuntime[];
}

export interface ComponentRuntime
  extends Omit<ComponentSchema, "props" | "className" | "style" | "emits" | "slots"> {
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
  emits: Array<
    Omit<ComponentSchema["emits"][number], "invoke"> & {
      invoke: (...args: unknown[]) => unknown;
    }
  >;
  slots: Partial<{
    default: ComponentRuntime[];
    [slotName: string]: ComponentRuntime[];
  }>;
}

export interface DatasetRuntime extends Omit<DatasetSchema, "define"> {
  /**
   * @TODO pinia 类型
   */
  define: () => unknown;
}
