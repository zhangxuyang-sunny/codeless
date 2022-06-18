import { AbstractNode } from "../common/AbstractNode";
import { NodeTypes } from "../common/enums";

declare global {
  interface NodeSchema {
    [NodeTypes.Unknown]: {
      schema: UnknownSchema;
      value: UnknownValue;
    };
  }
}

export type UnknownSchema = {
  type: NodeTypes.Unknown;
  value: UnknownValue;
};

export type UnknownValue = unknown;

export class UnknownNode extends AbstractNode<NodeTypes.Unknown> {
  constructor() {
    super(NodeTypes.Unknown);
  }
  private value: unknown = "Unknown Value";

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

AbstractNode.setParser(UnknownNode);
