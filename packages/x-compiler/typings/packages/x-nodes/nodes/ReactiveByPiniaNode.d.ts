import type { ComputedRef } from "vue";
import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.ReactiveByPinia]: {
            schema: ReactiveByPiniaSchema;
            value: ReactiveByPiniaValue;
        };
    }
}
export interface ReactiveByPiniaSchema {
    type: NodeTypes.ReactiveByPinia;
    path: string;
}
export declare type ReactiveByPiniaValue<T = unknown> = ComputedRef<T>;
export declare class ReactiveByPiniaNode<T = unknown> extends AbstractNode<NodeTypes.ReactiveByPinia, ReactiveByPiniaSchema, ReactiveByPiniaValue<T>> {
    constructor();
    private path;
    setPath(path: string): void;
    setSchema(schema: ReactiveByPiniaSchema): this;
    getSchema(): {
        type: NodeTypes.ReactiveByPinia;
        path: string;
    };
    getValue(): ComputedRef<T>;
}
