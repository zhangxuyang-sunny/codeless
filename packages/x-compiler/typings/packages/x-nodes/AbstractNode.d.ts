import type { ComputedRef } from "vue";
import type { Store } from "pinia";
import type { TypePackages } from "../x-types/index";
import { NodeTypes } from "./enums";
declare type ExcludeEqual<T, U> = T extends U ? (U extends T ? never : T) : T;
declare type BaseSchema = {
    type: NodeTypes;
};
declare type BaseNodeSchema = Record<NodeTypes, {
    schema: BaseSchema;
    value: unknown;
}>;
declare global {
    interface NodeSchema extends BaseNodeSchema {
    }
    type NodeSchemas<T extends NodeTypes = NodeTypes> = ExcludeEqual<NodeSchema[T]["schema"], BaseSchema>;
    type NodeValues<T extends NodeTypes = NodeTypes> = NodeSchema[T]["value"];
}
declare type TypePiniaStore<T extends Record<string, unknown> = Record<string, unknown>> = Store<string, T, Record<string, FunctionConstructor>, Record<string, FunctionConstructor>>;
declare type TypePlatformThis<T extends Record<string, unknown> = Record<string, unknown>> = {
    piniaRecord: Record<string, TypePiniaStore<T>>;
};
export declare type TypePlatformFunction = (this: TypePlatformThis) => unknown;
export declare abstract class AbstractNode<T extends NodeTypes = NodeTypes, S extends NodeSchemas = NodeSchemas<T>, V extends NodeValues = NodeValues<T>> {
    constructor(type: T);
    protected readonly type: T;
    abstract setSchema(schema: S): this;
    abstract getSchema(): S;
    abstract getValue(): V;
    protected static parsers: Map<NodeTypes, {
        new (): AbstractNode;
    }>;
    static setParser(Parser: {
        new (): AbstractNode;
    }): void;
    private static context;
    private static packages;
    static setContext(context: TypePlatformThis): void;
    static getContext(): TypePlatformThis<Record<string, unknown>>;
    static setPiniaStore(key: string, store: TypePiniaStore): void;
    static getPiniaReactiveByPath<T>(path: string): ComputedRef<T>;
    static setPackages(packages: Partial<TypePackages>): void;
    static parseValue(schema: NodeSchemas): unknown;
    getType(): T;
}
declare global {
    interface Window {
        AbstractNode: typeof AbstractNode;
    }
}
export {};
