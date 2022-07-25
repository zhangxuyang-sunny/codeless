import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type StringSchema<T extends string = string> = {
  type: "String";
  value: T;
  $$?: T;
};

export function isStringNode(schema: TypeSchemaCollection): schema is StringSchema {
  return schema.type === "String" && typeof schema.value === "string";
}

export class StringNode extends AbstractNode<StringSchema> {
  constructor() {
    super({
      type: "String",
      value: ""
    });
  }

  isValidNode() {
    return isStringNode(this.schema);
  }

  setValue(val: string) {
    this.schema.value = val;
    return this;
  }

  getValue() {
    return super.schema.value;
  }
}
