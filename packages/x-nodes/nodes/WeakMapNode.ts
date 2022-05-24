import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.WeakMap]: {
      schema: WeakSchema;
      value: WeakValue<object>;
    };
  }
}

export interface WeakSchema {
  type: NodeTypes.WeakMap;
}

export type WeakValue<T extends object> = WeakMap<T, NodeValues>;

export class WeakMapNode extends AbstractNode<NodeTypes.WeakMap> {
  constructor() {
    super(NodeTypes.WeakMap);
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
    return new WeakMap();
  }
}

AbstractNode.setParser(WeakMapNode);
