import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Boolean;

function isValid(schema: ISchema): schema is Schema<BooleanNode> {
  return schema.type === type && typeof schema.value === "boolean";
}

export default class BooleanNode extends AbstractNode {
  protected readonly type = type;
  private value = false;

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setValue(val: boolean) {
    this.value = val;
  }

  setSchema(schema: ISchema) {
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

  getValue() {
    return this.value;
  }
}
