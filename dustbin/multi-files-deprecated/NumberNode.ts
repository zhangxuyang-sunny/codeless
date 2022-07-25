import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Number;

function isValid(schema: ISchema): schema is Schema<NumberNode> {
  return schema.type === type && typeof schema.value === "string";
}

export default class NumberNode extends AbstractNode {
  protected readonly type = type;
  private value = 0;

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setValue(val: number): this {
    this.value = val;
    return this;
  }

  getValue() {
    return this.value;
  }

  setSchema(schema: Schema<NumberNode>) {
    if (isValid(this.getSchema())) {
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
}
