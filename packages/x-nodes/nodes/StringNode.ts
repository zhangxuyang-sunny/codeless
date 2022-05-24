import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.String]: {
      schema: StringSchema;
      value: StringValue;
    };
  }
}

export type StringSchema<T extends string = string> = {
  type: NodeTypes.String;
  value: StringValue<T>;
};

export type StringValue<T extends string = string> = T;

export class StringNode<T extends string = string> //
  extends AbstractNode<NodeTypes.String, StringSchema<T>, StringValue<T>>
{
  constructor() {
    super(NodeTypes.String);
  }
  private value = <T>"";

  setValue(val: T) {
    this.value = val;
    return this;
  }

  setSchema(schema: StringSchema<T>) {
    this.value = schema.value;
    return this;
  }

  getSchema(): StringSchema<T> {
    return {
      type: this.type,
      value: this.value
    };
  }

  getValue() {
    return <T>String(this.value).toString();
  }
}

AbstractNode.setParser(StringNode);
