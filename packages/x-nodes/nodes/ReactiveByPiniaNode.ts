import type { ComputedRef } from "vue";
import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.ReactiveByPinia]: {
      schema: ReactiveByPiniaSchema;
      value: ReactiveByPiniaValue;
    };
  }
}

export interface ReactiveByPiniaSchema {
  type: NodeTypes.ReactiveByPinia;
  path: string;
}

export type ReactiveByPiniaValue<T = unknown> = ComputedRef<T>;

export class ReactiveByPiniaNode<T = unknown> //
  extends AbstractNode<
    NodeTypes.ReactiveByPinia,
    ReactiveByPiniaSchema,
    ReactiveByPiniaValue<T>
  >
{
  constructor() {
    super(NodeTypes.ReactiveByPinia);
  }
  private path = "";

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
    return AbstractNode.getPiniaReactiveByPath<T>(this.path);
  }
}

AbstractNode.setParser(ReactiveByPiniaNode);
