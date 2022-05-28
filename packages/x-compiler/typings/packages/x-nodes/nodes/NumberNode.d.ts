import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Number]: {
            schema: NumberSchema;
            value: NumberValue;
        };
    }
}
export interface NumberSchema<T extends number = number> {
    type: NodeTypes.Number;
    value: T;
}
export declare type NumberValue<T extends number = number> = T;
export declare class NumberNode<T extends number = number> extends AbstractNode<NodeTypes.Number, NumberSchema<T>, NumberValue<T>> {
    constructor();
    private value;
    setValue(val: T): this;
    setSchema(schema: NumberSchema<T>): this;
    getSchema(): NumberSchema<T>;
    getValue(): T;
}
