import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.BigInt]: {
            schema: BigIntSchema;
            value: BigIntValue;
        };
    }
}
declare type BigIntDesc = Parameters<typeof BigInt>[0];
export interface BigIntSchema<T extends BigIntDesc = BigIntDesc> {
    type: NodeTypes.BigInt;
    value: T;
}
export declare type BigIntValue = bigint;
export declare class BigIntNode<T extends BigIntDesc = BigIntDesc> extends AbstractNode<NodeTypes.BigInt, BigIntSchema<T>> {
    constructor();
    private value;
    setValue(value: T): this;
    setSchema(schema: BigIntSchema<T>): this;
    getSchema(): {
        type: NodeTypes.BigInt;
        value: T;
    };
    getValue(): bigint;
}
export {};
