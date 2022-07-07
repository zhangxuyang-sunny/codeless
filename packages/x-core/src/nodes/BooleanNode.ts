import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Boolean]: {
      schema: BooleanSchema;
      value: BooleanValue;
    };
  }
}

export type BooleanSchema<T extends boolean = boolean> = {
  type: NodeTypes.Boolean;
  value: BooleanValue<T>;
};

export type BooleanValue<T extends boolean = boolean> = T;

export class BooleanNode<T extends boolean = boolean> //
  extends AbstractNode<NodeTypes.Boolean, BooleanSchema<T>, BooleanValue<T>>
{
  constructor() {
    super(NodeTypes.Boolean);
  }
  private value = <T>false;

  setValue(val: T) {
    this.value = val;
    return this;
  }

  setSchema(schema: BooleanSchema<T>) {
    this.value = schema.value;
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      value: this.value
    };
  }

  getValue() {
    return <T>Boolean(this.value).valueOf();
  }
}

AbstractNode.setParser(BooleanNode);
