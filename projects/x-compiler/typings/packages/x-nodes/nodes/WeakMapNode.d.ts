import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.WeakMap]: {
            schema: WeakSchema;
            value: WeakValue<object>;
        };
    }
}
export interface WeakSchema {
    type: NodeTypes.WeakMap;
}
export declare type WeakValue<T extends object> = WeakMap<T, NodeValues>;
export declare class WeakMapNode extends AbstractNode<NodeTypes.WeakMap> {
    constructor();
    setSchema(): this;
    getSchema(): {
        type: NodeTypes.WeakMap;
    };
    getValue(): WeakMap<object, any>;
}
