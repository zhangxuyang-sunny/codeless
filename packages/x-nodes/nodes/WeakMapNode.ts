import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.WeakMap]: {
      schema: WeakMapSchema;
      value: WeakValue<object>;
    };
  }
}

export interface WeakMapSchema {
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
