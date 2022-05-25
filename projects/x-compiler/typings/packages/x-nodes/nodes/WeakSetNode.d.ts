import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.WeakSet]: {
            schema: WeakSetSchema;
            value: WeakSetValue<object>;
        };
    }
}
export interface WeakSetSchema {
    type: NodeTypes.WeakSet;
}
export declare type WeakSetValue<T extends object> = WeakSet<T>;
export declare class WeakSetNode extends AbstractNode<NodeTypes.WeakSet> {
    constructor();
    setSchema(): this;
    getSchema(): {
        type: NodeTypes.WeakSet;
    };
    getValue(): WeakSet<object>;
}
