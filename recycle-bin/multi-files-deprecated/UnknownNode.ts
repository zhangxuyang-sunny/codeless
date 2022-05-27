import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Unknown;

function isValid(schema: ISchema): schema is Schema<UnknownNode> {
  return schema.type === type;
}

export default class UnknownNode extends AbstractNode {
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
    return `Unknown Value`;
  }
}
