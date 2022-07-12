import { NodeTypes } from "../enums";
import { AbstractNode, BaseSchema } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.WeakSet]: {
      schema: WeakSetSchema;
      value: WeakSetValue<object>;
    };
  }
}

export interface WeakSetSchema extends BaseSchema {
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
    return super.getBaseSchema();
  }

  getValue() {
    return new WeakSet();
  }
}

AbstractNode.setParser(WeakSetNode);
