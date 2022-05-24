import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Number]: {
      schema: NumberSchema;
      value: NumberValue;
    };
  }
}

export interface NumberSchema<T extends number = number> {
  type: NodeTypes.Number;
  value: T;
}

export type NumberValue<T extends number = number> = T;

export class NumberNode<T extends number = number> //
  extends AbstractNode<NodeTypes.Number, NumberSchema<T>, NumberValue<T>>
{
  constructor() {
    super(NodeTypes.Number);
  }
  private value = <T>0;

  setValue(val: T) {
    this.value = val;
    return this;
  }

  setSchema(schema: NumberSchema<T>) {
    this.value = schema.value;
    return this;
  }

  getSchema(): NumberSchema<T> {
    return {
      type: this.type,
      value: this.value
    };
  }

  getValue() {
    return <T>Number(this.value).valueOf();
  }
}

AbstractNode.setParser(NumberNode);
