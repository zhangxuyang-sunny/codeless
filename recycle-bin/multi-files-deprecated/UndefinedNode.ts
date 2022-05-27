import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Undefined;

function isValid(schema: ISchema): schema is Schema<UndefinedNode> {
  return schema.type === type;
}

export default class UndefinedNode extends AbstractNode {
  protected readonly type = type;

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setSchema() {
    return this;
  }

  getSchema() {
    return {
      type
    };
  }

  getValue() {
    return undefined;
  }
}
