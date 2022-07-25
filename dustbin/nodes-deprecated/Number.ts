import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type NumberSchema<T extends number = number> = {
  type: "Number";
  value: T;
  $$?: T;
};

export function isNumberNode(schema: TypeSchemaCollection): schema is NumberSchema {
  return schema.type === "Number" && typeof schema.initial === "number";
}

export class NumberNode extends AbstractNode<NumberSchema> {
  constructor() {
    super({
      type: "Number",
      value: 0
    });
  }

  isValidNode(): boolean {
    return isNumberNode(this.schema);
  }

  setValue(val: number) {
    this.schema.value = val;
    return this;
  }

  getValue() {
    return this.schema.value;
  }
}
