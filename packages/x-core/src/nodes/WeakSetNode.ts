import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.WeakSet]: {
      schema: WeakSetSchema;
      value: WeakSetValue<object>;
    };
  }
}

export interface WeakSetSchema {
  type: NodeTypes.WeakSet;
}

export type WeakSetValue<T extends object = object> = WeakSet<T>;

export class WeakSetNode extends AbstractNode<NodeTypes.WeakSet> {
  constructor() {
    super(NodeTypes.WeakSet);
  }

  setSchema() {
    return this;
  }

  getSchema() {
    return {
      type: this.type
    };
  }

  getValue() {
    return new WeakSet();
  }
}

AbstractNode.setParser(WeakSetNode);
