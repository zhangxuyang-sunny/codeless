import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Undefined]: {
            schema: UndefinedSchema;
            value: UndefinedValue;
        };
    }
}
export interface UndefinedSchema {
    type: NodeTypes.Undefined;
    value: UndefinedValue;
}
export declare type UndefinedValue = undefined;
export declare class UndefinedNode extends AbstractNode<NodeTypes.Undefined> {
    constructor();
    private readonly value;
    setSchema(): this;
    getSchema(): {
        type: NodeTypes.Undefined;
        value: undefined;
    };
    getValue(): undefined;
}
