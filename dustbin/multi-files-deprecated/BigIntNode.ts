import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.BigInt;

function isValid(schema: ISchema): schema is Schema<BigIntNode> {
  return schema.type === type && typeof schema.value === "number";
}

export default class BigIntNode extends AbstractNode {
  protected readonly type = type;
  private value = 0;

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setValue(value: number) {
    this.value = value;
    return this;
  }

  setSchema(schema: Schema<BigIntNode>) {
    if (isValid(schema)) {
      this.setValue(schema.value);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      value: this.value
    };
  }

  getValue() {
    return BigInt(this.value);
  }
}
