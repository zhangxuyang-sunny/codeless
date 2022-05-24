import { NodeTypes } from '../enums';
import { AbstractNode } from '../AbstractNode';

declare global {
  interface NodeSchema {
    [NodeTypes.BigInt]: {
      schema: BigIntSchema;
      value: BigIntValue;
    };
  }
}

type BigIntDesc = Parameters<typeof BigInt>[0];
export interface BigIntSchema<T extends BigIntDesc = BigIntDesc> {
  type: NodeTypes.BigInt;
  value: T;
}

export type BigIntValue = bigint;

export class BigIntNode<T extends BigIntDesc = BigIntDesc> //
  extends AbstractNode<NodeTypes.BigInt, BigIntSchema<T>>
{
  constructor() {
    super(NodeTypes.BigInt);
  }
  private value: T = <T>0;

  setValue(value: T) {
    this.value = value;
    return this;
  }

  setSchema(schema: BigIntSchema<T>) {
    this.setValue(schema.value);
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      value: this.value,
    };
  }

  getValue() {
    return BigInt(this.value).valueOf();
  }
}

AbstractNode.setParser(BigIntNode);
