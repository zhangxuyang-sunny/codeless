import {
  ApplicationSchema,
  ComponentSchema,
  DatasetSchema,
  isJSExpression,
  isJSFunction,
  JSExpression,
  JSFunction
} from "@lowcode/schema";
import { ApplicationRuntime, ComponentRuntime, DatasetRuntime } from "./schema";

type PageSchema = ApplicationSchema["pages"][number];
type PropsRuntime = ComponentRuntime["props"];
type ClassNameRuntime = ComponentRuntime["className"];
type StyleRuntime = ComponentRuntime["style"];
type EmitsRuntime = ComponentRuntime["emits"];
type SlotsRuntime = ComponentRuntime["slots"];
type Context = ApplicationRuntime["context"];

/**
 * ApplicationSchema 转换器
 *
 * ApplicationSchema -> ApplicationRuntime
 *
 * @JSExpression 响应式表达式使用 window.vue.computed 实现
 * @datasets 响应式使用 pinia 实现
 */
export class ApplicationTransformer {
  constructor(private readonly schema: ApplicationSchema) {}

  readonly context: Context = {
    datasets: {}
  };

  setDataset(key: string, dataset: unknown) {
    this.context.datasets[key] = dataset;
  }

  private transformJSExpression(schema: JSExpression) {
    return transformJSExpression(schema, this.context);
  }

  private transformJSFunction(schema: JSFunction) {
    return transformJSFunction(schema, this.context);
  }

  /**
   * DatasetSchema 转换
   *
   * DatasetSchema -> DatasetRuntime
   */
  private transformDataset(dataset: DatasetSchema): DatasetRuntime {
    return {
      ...dataset,
      define: isJSFunction(dataset.define)
        ? this.transformJSFunction(dataset.define)()
        : isJSExpression(dataset.define)
        ? this.transformJSExpression(dataset.define)
        : (() => {
            console.warn("The dataset's field 'define' is not a JSFunction node.");
          })()
    };
  }

  /**
   * ComponentSchema 转换
   *
   * ComponentSchema -> ComponentRuntime
   */
  private transformComponent(component: ComponentSchema): ComponentRuntime {
    // 转换 props
    const props: PropsRuntime = Object.entries(component.props).reduce((prev, [key, prop]) => {
      if (isJSExpression(prop)) {
        prev[key] = this.transformJSExpression(prop);
      } else if (isJSFunction(prop)) {
        prev[key] = this.transformJSFunction(prop);
      }
      return prev;
    }, {} as PropsRuntime);

    // 转换 className
    const className: ClassNameRuntime = isJSExpression(component.className)
      ? this.transformJSExpression(component.className)
      : component.className;

    // 转换  style
    let style: StyleRuntime = {};
    if (isJSExpression(component.style)) {
      style = this.transformJSExpression(component.style);
    } else if (typeof component.style === "object") {
      style = Object.entries(component.style).reduce((prev, [key, value]) => {
        return Object.assign(prev, {
          [key]: isJSExpression(value) //
            ? this.transformJSExpression(value)
            : value
        });
      }, {});
    }

    // 转换 emits
    const emits: EmitsRuntime = component.emits.map(emit => ({
      ...emit,
      invoke: isJSFunction(emit.invoke) //
        ? this.transformJSFunction(emit.invoke)
        : emit.invoke
    }));

    // 转换 slots
    const slots: SlotsRuntime = Object.entries(component.slots).reduce(
      (result, [key, components]) => {
        result[key] = (components || []).map(this.transformComponent.bind(this));
        return result;
      },
      {} as SlotsRuntime
    );
    return {
      ...component,
      props,
      className,
      style,
      emits,
      slots
    };
  }

  // 转换页面
  private transformPage(page: PageSchema) {
    return {
      ...page,
      component: this.transformComponent(page.component)
    };
  }

  runtime(): ApplicationRuntime {
    return {
      ...this.schema,
      context: this.context,
      pages: this.schema.pages.map(this.transformPage.bind(this)),
      datasets: this.schema.datasets.map(this.transformDataset.bind(this))
    };
  }
}

/**
 * 解析 JS 表达式类型
 * @param schema JSExpression 协议
 * @param context 上下文数据
 */
export function transformJSExpression(schema: JSExpression, context: Context) {
  return new Function(
    "context",
    schema.reactive //
      ? `return vue.computed(() => (${schema.value}))`
      : `return ${schema.value}`
  )(context);
}

/**
 * 解析 JS 方法定义
 * @param schema JSFunction 协议
 * @param context 上下文数据
 */
export function transformJSFunction(schema: JSFunction, context: Context) {
  return new Function("context", `return ${schema.value}`)(context);
}
