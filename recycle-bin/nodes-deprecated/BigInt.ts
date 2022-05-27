import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type BigIntSchema = {
  type: "BigInt";
  value: Parameters<typeof BigInt>[0];
  $$?: bigint;
};

export function isBigIntNode(schema: TypeSchemaCollection): schema is BigIntSchema {
  return (
    schema.type === "BigInt" &&
    ["string", "number", "boolean", "bigint"].includes(typeof schema.value)
  );
}

export class BigIntNode extends AbstractNode<BigIntSchema> {
  constructor() {
    super({
      type: "BigInt",
      value: 0 // 默认值 0n
    });
  }

  isValidNode() {
    return isBigIntNode(this.schema);
  }

  setValue(val: BigIntSchema["value"]) {
    this.schema.value = val;
    return this;
  }

  getValue() {
    return BigInt(super.schema.value);
  }
}
