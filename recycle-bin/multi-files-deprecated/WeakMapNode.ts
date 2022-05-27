import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.WeakMap;

function isValid(schema: ISchema): schema is Schema<WeakMapNode> {
  return schema.type === type;
}

export default class WeakMapNode extends AbstractNode {
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
    return new WeakMap();
  }
}
