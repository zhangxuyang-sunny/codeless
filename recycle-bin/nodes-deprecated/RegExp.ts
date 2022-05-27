import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type RegExpSchema = {
  type: "RegExp";
  pattern: Parameters<typeof RegExp>[0];
  flag: Parameters<typeof RegExp>[1];
  $$?: RegExp;
};

export function isRegExpNode(schema: TypeSchemaCollection): schema is RegExpSchema {
  return (
    schema.type === "RegExp" &&
    (typeof schema.pattern === "string" || schema.pattern instanceof RegExp) &&
    typeof schema.flag === "string"
  );
}

export class RegExpNode extends AbstractNode<RegExpSchema> {
  constructor() {
    super({
      type: "RegExp",
      pattern: "",
      flag: ""
    });
  }

  isValidNode() {
    return isRegExpNode(this.schema);
  }

  setPattern(pattern: RegExpSchema["pattern"]) {
    this.schema.pattern = pattern;
    return this;
  }

  setFlag(flag: RegExpSchema["flag"]) {
    this.schema.flag = flag;
    return this;
  }

  getValue() {
    return new RegExp(this.schema.pattern, this.schema.flag);
  }
}
