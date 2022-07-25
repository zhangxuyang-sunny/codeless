import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.String;

function isValid(schema: ISchema): schema is Schema<StringNode> {
  return schema.type === type && typeof schema.value === "string";
}

export default class StringNode<V extends string = string> extends AbstractNode {
  protected readonly type = type;
  private value: V | string = "";

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setValue(val: V) {
    this.value = val;
    return this;
  }

  setSchema(schema: Schema<StringNode<V>>) {
    if (isValid(schema)) {
      this.value = schema.value;
    }
    return this;
  }

  getSchema() {
    return {
      type,
      value: this.value
    };
  }

  getValue(): V | string {
    return this.value;
  }
}
