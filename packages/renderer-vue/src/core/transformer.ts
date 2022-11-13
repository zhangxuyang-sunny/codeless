import {
  Application,
  Page,
  Component,
  Dataset,
  isJSExpression,
  isJSFunction,
  JSExpression,
  JSFunction,
  TargetEvent,
  ApplicationListener
} from "@codeless/schema";
import {
  ApplicationRuntime,
  ComponentRuntime,
  DatasetRuntime,
  ListenerRuntime,
  TargetEventRuntime
} from "./runtime-schema";

type PropsRuntime = ComponentRuntime["props"];
type ClassNameRuntime = ComponentRuntime["className"];
type StyleRuntime = ComponentRuntime["style"];
type EventsRuntime = ComponentRuntime["events"];
type SlotsRuntime = ComponentRuntime["slots"];
type IContext = ApplicationRuntime["context"];

class Context implements IContext {
  datasets: IContext["datasets"] = {};
  current: IContext["current"] = null;
}

const staticRoot = "//127.0.0.1:7890/static/";

/**
 * Application 转换器
 *
 * Application -> ApplicationRuntime
 *
 * @JSExpression 响应式表达式使用 window.vue.computed 实现
 * @datasets 响应式使用 pinia 实现
 */
export class ApplicationTransformer {
  constructor(private readonly schema: Application) {}

  readonly context = new Context();

  setDataset(key: string, dataset: unknown) {
    this.context.datasets[key] = dataset;
  }

  private transformJSExpression(schema: JSExpression, current: unknown = null) {
    return transformJSExpression(schema, Object.assign({}, this.context, { current }));
  }

  private transformJSFunction(schema: JSFunction, current: unknown = null) {
    return transformJSFunction(schema, Object.assign({}, this.context, { current }));
  }

  /**
   * EventTarget 转换
   */
  private transformTargetEvent(target: TargetEvent): TargetEventRuntime {
    const { params } = target;
    return {
      ...target,
      /**
       * params 可以对事件接受者所需参数进行处理
       * JSExpression 和 JSFunction 都会被解析为方法，为了保证每次调用都触发函数拿到最新的状态
       * 渲染器中座判断 typeof params === 'function' 后进行调用，并传入 event 来源的参数雷彪
       * params 方法中可以返回一个或多个参数作为事件接受者的参数列表，并在当前 JSExpression 或 JSExpression 上下文 current 字段中体现
       */
      params:
        params === null
          ? null
          : (...args: unknown[]) =>
              isJSExpression(params)
                ? this.transformJSExpression(params, args)
                : isJSFunction(params)
                ? this.transformJSFunction(params, args)(...args)
                : args
    };
  }

  /**
   * DatastoreSchema 转换
   *
   * DatastoreSchema -> DatasetRuntime
   */
  private transformDataset(dataset: Dataset): DatasetRuntime {
    return {
      ...dataset,
      define: isJSFunction(dataset.define)
        ? this.transformJSFunction(dataset.define)()
        : isJSExpression(dataset.define)
        ? this.transformJSExpression(dataset.define)
        : (() => {
            console.warn("The dataset's field 'define' is not a valid node.");
          })()
    };
  }

  /**
   * ComponentSchema 转换
   *
   * ComponentSchema -> ComponentRuntime
   */
  private transformComponent(component: Component): ComponentRuntime {
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
      style = Object.entries(component.style).reduce((result, [cssKey, cssVal]) => {
        return Object.assign(result, {
          [cssKey]: isJSExpression(cssVal) //
            ? this.transformJSExpression(cssVal)
            : cssVal
        });
      }, {});
    }

    // 转换 events
    const events: EventsRuntime = {};
    Object.entries(component.events).forEach(([event, { target, invoke, once }]) => {
      events[event] = {
        target: target.map(this.transformTargetEvent.bind(this)),
        invoke: isJSFunction(invoke) ? this.transformJSFunction(invoke) : null,
        once
      };
    });

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
      src: staticRoot + component.src,
      props,
      className,
      style,
      events,
      slots
    };
  }

  // 转换页面
  private transformPage(page: Page) {
    return {
      ...page,
      component: this.transformComponent(page.component)
    };
  }

  // 转换 listeners
  private transformListener(listener: ApplicationListener): ListenerRuntime {
    const { target, invoke } = listener;
    return {
      ...listener,
      target: target.map(this.transformTargetEvent.bind(this)),
      invoke: isJSFunction(invoke) ? this.transformJSFunction(invoke) : null
    };
  }

  runtime(): ApplicationRuntime {
    return {
      ...this.schema,
      context: this.context,
      pages: this.schema.pages.map(this.transformPage.bind(this)),
      datasets: this.schema.datasets.map(this.transformDataset.bind(this)),
      listeners: this.schema.listeners.map(this.transformListener.bind(this))
    };
  }
}

/**
 * 解析 JS 表达式类型
 * @param schema JSExpression 协议
 * @param context 上下文数据
 */
export function transformJSExpression(schema: JSExpression, context: IContext) {
  return new Function(
    "context",
    // TODO: 是否能优化 static 模式
    `return vue.computed(() => (${schema.value}))`
  )(context);
}

/**
 * 解析 JS 方法定义
 * @param schema JSFunction 协议
 * @param context 上下文数据
 */
export function transformJSFunction(schema: JSFunction, context: IContext) {
  return new Function(
    "context",
    schema.useStrict //
      ? `useStrict;\n return ${schema.value}`
      : `return ${schema.value}`
  )(context);
}
