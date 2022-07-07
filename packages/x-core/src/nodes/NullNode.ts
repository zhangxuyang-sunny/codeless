import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Null]: {
      schema: NullSchema;
      value: NullValue;
    };
  }
}

export interface NullSchema {
  type: NodeTypes.Null;
  value: NullValue;
}

export type NullValue = null;

export class NullNode extends AbstractNode<NodeTypes.Null> {
  constructor() {
    super(NodeTypes.Null);
  }
  private readonly value: NullValue = null;

  setSchema() {
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      value: this.value
    };
  }

  getValue() {
    return this.value;
  }
}

AbstractNode.setParser(NullNode);
