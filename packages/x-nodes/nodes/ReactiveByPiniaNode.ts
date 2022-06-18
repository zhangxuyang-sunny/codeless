import type { ComputedRef } from "vue";
import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { get as lodashGet } from "lodash";

declare global {
  interface NodeSchema {
    [NodeTypes.ReactiveByPinia]: {
      schema: ReactiveByPiniaSchema;
      value: unknown;
    };
  }
}

export interface ReactiveByPiniaSchema {
  type: NodeTypes.ReactiveByPinia;
  path: string;
}

export class ReactiveByPiniaNode<T = unknown> //
  extends AbstractNode<
    NodeTypes.ReactiveByPinia,
    ReactiveByPiniaSchema,
    ComputedRef<T>
  >
{
  constructor() {
    super(NodeTypes.ReactiveByPinia);
  }
  private path = "";

  // 获取 pinia 的响应式计算数据
  private getPiniaReactiveByPath(path: string) {
    return <ComputedRef<T>>(
      AbstractNode.getPackage<typeof import("vue")>("vue").computed(() =>
        lodashGet(AbstractNode.getContext(), path)
      )
    );
  }

  setPath(path: string) {
    this.path = path;
  }

  setSchema(schema: ReactiveByPiniaSchema) {
    this.path = schema.path;
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      path: this.path
    };
  }

  getValue() {
    return this.getPiniaReactiveByPath(this.path);
  }
}

AbstractNode.setParser(ReactiveByPiniaNode);
