import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type BooleanSchema<T extends boolean = boolean> = {
  type: "Boolean";
  value: T;
  $$?: T;
};

export function isBooleanNode(schema: TypeSchemaCollection): schema is BooleanSchema {
  return schema.type === "Boolean" && typeof schema.value === "boolean";
}

export class BooleanNode extends AbstractNode<BooleanSchema> {
  constructor() {
    super({
      type: "Boolean",
      value: false
    });
  }

  isValidNode() {
    return isBooleanNode(this.schema);
  }

  setValue(val: boolean) {
    this.schema.value = val;
    return this;
  }

  getValue() {
    return super.schema.value;
  }
}
