import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.String]: {
            schema: StringSchema;
            value: StringValue;
        };
    }
}
export declare type StringSchema<T extends string = string> = {
    type: NodeTypes.String;
    value: StringValue<T>;
};
export declare type StringValue<T extends string = string> = T;
export declare class StringNode<T extends string = string> extends AbstractNode<NodeTypes.String, StringSchema<T>, StringValue<T>> {
    constructor();
    private value;
    setValue(val: T): this;
    setSchema(schema: StringSchema<T>): this;
    getSchema(): StringSchema<T>;
    getValue(): T;
}
