import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Undefined]: {
      schema: UndefinedSchema;
      value: UndefinedValue;
    };
  }
}

export interface UndefinedSchema {
  type: NodeTypes.Undefined;
  value: UndefinedValue;
}

export type UndefinedValue = undefined;

export class UndefinedNode extends AbstractNode<NodeTypes.Undefined> {
  constructor() {
    super(NodeTypes.Undefined);
  }
  private readonly value: UndefinedValue = undefined;

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

AbstractNode.setParser(UndefinedNode);
