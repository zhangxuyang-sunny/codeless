import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Boolean]: {
            schema: BooleanSchema;
            value: BooleanValue;
        };
    }
}
export declare type BooleanSchema<T extends boolean = boolean> = {
    type: NodeTypes.Boolean;
    value: BooleanValue<T>;
};
export declare type BooleanValue<T extends boolean = boolean> = T;
export declare class BooleanNode<T extends boolean = boolean> extends AbstractNode<NodeTypes.Boolean, BooleanSchema<T>, BooleanValue<T>> {
    constructor();
    private value;
    setValue(val: T): this;
    setSchema(schema: BooleanSchema<T>): this;
    getSchema(): {
        type: NodeTypes.Boolean;
        value: T;
    };
    getValue(): T;
}
