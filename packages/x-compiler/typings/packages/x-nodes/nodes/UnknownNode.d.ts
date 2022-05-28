import { AbstractNode } from "../AbstractNode";
import { NodeTypes } from "../enums";
declare global {
    interface NodeSchema {
        [NodeTypes.Unknown]: {
            schema: UnknownSchema;
            value: UnknownValue;
        };
    }
}
export declare type UnknownSchema = {
    type: NodeTypes.Unknown;
    value: UnknownValue;
};
export declare type UnknownValue = unknown;
export declare class UnknownNode extends AbstractNode<NodeTypes.Unknown> {
    constructor();
    private value;
    setSchema(): this;
    getSchema(): {
        type: NodeTypes.Unknown;
        value: unknown;
    };
    getValue(): unknown;
}
