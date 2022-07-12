import { NodeTypes } from "../enums";
import { AbstractNode, BaseSchema } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.WeakMap]: {
      schema: WeakMapSchema;
      value: WeakMapValue<object>;
    };
  }
}

export interface WeakMapSchema extends BaseSchema {
  type: NodeTypes.WeakMap;
}

export type WeakMapValue<T extends object = object> = WeakMap<T, NodeValues>;

export class WeakMapNode extends AbstractNode<NodeTypes.WeakMap> {
  constructor() {
    super(NodeTypes.WeakMap);
  }

  setSchema() {
    return this;
  }

  getSchema() {
    return super.getBaseSchema();
  }

  getValue() {
    return new WeakMap();
  }
}

AbstractNode.setParser(WeakMapNode);
