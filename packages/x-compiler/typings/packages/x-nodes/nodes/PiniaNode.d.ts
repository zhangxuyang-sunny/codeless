import type { DefineStoreOptions } from "pinia";
import { NodeTypes } from "../enums";
import { AbstractNode, TypePlatformFunction } from "../AbstractNode";
import { StringSchema } from "./StringNode";
import { FunctionSchema } from "./FunctionNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Pinia]: {
            schema: PiniaSchema;
            value: PiniaValue;
        };
    }
}
export interface PiniaSchema {
    type: NodeTypes.Pinia;
    key: StringSchema;
    state: Record<string, NodeSchemas>;
    getters: Record<string, FunctionSchema>;
    actions: Record<string, FunctionSchema>;
    hydrate?: FunctionSchema;
}
export declare type PiniaValue<T extends Record<string, unknown> = Record<string, unknown>> = DefineStoreOptions<string, T, Record<string, TypePlatformFunction>, Record<string, TypePlatformFunction>>;
export declare class PiniaNode<T extends Record<string, unknown> = Record<string, unknown>> extends AbstractNode<NodeTypes.Pinia, PiniaSchema, PiniaValue<T>> {
    constructor();
    private key;
    private state;
    private getters;
    private actions;
    private hydrate;
    setSchema(schema: PiniaSchema): this;
    getSchema(): PiniaSchema;
    getValue(): PiniaValue<T>;
}
