import { IApplicationSchema, IComponentSchema, IDatasetSchema } from "@lowcode/schema";

/**
 * vue 渲染器运行时协议
 * 通过 IApplicationSchema 转换而来的私有协议
 * 这里重写协议中所需要转换成运行时的数据类型
 */

export interface ApplicationRuntime extends Omit<IApplicationSchema, "pages" | "datasets"> {
  context: {
    /**
     * @TODO pinia 类型
     */
    datasets: Record<string, unknown>;
  };
  pages: Array<
    Omit<IApplicationSchema["pages"][number], "component"> & {
      component: ComponentRuntime;
    }
  >;
  datasets: DatasetRuntime[];
}

export interface ComponentRuntime
  extends Omit<IComponentSchema, "props" | "className" | "style" | "emits" | "slots"> {
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
    Omit<IComponentSchema["emits"][number], "invoke"> & {
      invoke: (...args: unknown[]) => unknown;
    }
  >;
  slots: Partial<{
    default: ComponentRuntime[];
    [slotName: string]: ComponentRuntime[];
  }>;
}

export interface DatasetRuntime extends Omit<IDatasetSchema, "define"> {
  /**
   * @TODO pinia 类型
   */
  define: () => unknown;
}
