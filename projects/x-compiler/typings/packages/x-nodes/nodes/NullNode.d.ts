import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Null]: {
            schema: NullSchema;
            value: NullValue;
        };
    }
}
export interface NullSchema {
    type: NodeTypes.Null;
    value: NullValue;
}
export declare type NullValue = null;
export declare class NullNode extends AbstractNode<NodeTypes.Null> {
    constructor();
    private readonly value;
    setSchema(): this;
    getSchema(): {
        type: NodeTypes.Null;
        value: null;
    };
    getValue(): null;
}
