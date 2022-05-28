import type { ComputedRef, VNodeProps } from "vue";
import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
import { ArraySchema } from "./ArrayNode";
import { ObjectSchema } from "./ObjectNode";
import { StringSchema } from "./StringNode";
import { ReactiveByPiniaSchema } from "./ReactiveByPiniaNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Material]: {
            schema: MaterialSchema;
            value: MaterialValue;
        };
    }
}
export interface MaterialSchema {
    type: NodeTypes.Material;
    id: StringSchema;
    key: StringSchema;
    title: StringSchema;
    version: StringSchema;
    src: StringSchema;
    style: ObjectSchema | ReactiveByPiniaSchema;
    commonProps: ObjectSchema | ReactiveByPiniaSchema;
    props: ObjectSchema | ReactiveByPiniaSchema;
    emits: ArraySchema;
    listeners: ArraySchema;
    slots: ObjectSchema;
}
export declare type MaterialEvent = `${string}:${string}` | string;
export declare type MaterialStyle = Partial<CSSStyleDeclaration>;
export declare type MaterialProps = VNodeProps & {
    [x: string]: unknown;
};
export declare type MaterialCommonProps = {
    if?: unknown;
    show?: unknown;
    hidden?: unknown;
};
export declare type MaterialTarget = [MaterialEvent, (...args: unknown[]) => unknown] | [MaterialEvent];
export declare type MaterialEmit = {
    event: MaterialEvent;
    target?: MaterialTarget[];
    invoke?: (...args: unknown[]) => unknown;
};
export declare type MaterialListener = {
    event: MaterialEvent;
    origin: string;
};
export interface MaterialValue {
    id: string;
    key: string;
    title: string;
    version: string;
    src: string;
    style: ComputedRef<MaterialStyle> | MaterialStyle;
    props: ComputedRef<MaterialProps> | MaterialProps;
    commonProps: ComputedRef<MaterialCommonProps> | MaterialCommonProps;
    emits: MaterialEmit[];
    listeners: MaterialListener[];
    slots: Partial<{
        default: MaterialValue[];
        [x: string]: MaterialValue[];
    }>;
}
export declare class MaterialNode extends AbstractNode<NodeTypes.Material> {
    constructor();
    private readonly id;
    private readonly key;
    private readonly title;
    private readonly version;
    private readonly src;
    private style;
    private props;
    private commonProps;
    private readonly emits;
    private readonly listeners;
    private readonly slots;
    setId(id: string): this;
    setKey(key: string): void;
    setTitle(title: string): this;
    setVersion(version: string): this;
    setSchema(schema: MaterialSchema): this;
    getSchema(): MaterialSchema;
    getValue(): MaterialValue;
}
