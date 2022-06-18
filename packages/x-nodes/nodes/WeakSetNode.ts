import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

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

export type WeakSetValue<T extends object> = WeakSet<T>;

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
