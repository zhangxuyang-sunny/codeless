import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.RegExp;

function isValid(schema: ISchema): schema is Schema<RegExpNode> {
  return (
    schema.type === type &&
    (typeof schema.pattern === "string" || schema.pattern instanceof RegExp) &&
    typeof schema.flag === "string"
  );
}

export default class RegExpNode extends AbstractNode {
  protected readonly type = type;
  private pattern: Parameters<typeof RegExp>[0] = "";
  private flag: Parameters<typeof RegExp>[1];

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setPattern(pattern: typeof this.pattern) {
    this.pattern = pattern;
    return this;
  }

  setFlag(flag: typeof this.flag) {
    this.flag = flag;
    return this;
  }

  setSchema(schema: Schema<RegExpNode>) {
    if (isValid(schema)) {
      this.pattern = schema.pattern;
      this.flag = schema.flag;
    }
    return this;
  }

  getSchema() {
    return {
      type,
      pattern: this.pattern,
      flag: this.flag
    };
  }

  getValue() {
    return new RegExp(this.pattern, this.flag);
  }
}
