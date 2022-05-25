import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Map]: {
            schema: MapSchema;
            value: MapValue;
        };
    }
}
export interface MapSchema<T extends string = string> {
    type: NodeTypes.Map;
    iterable: [T, NodeSchemas][];
}
export declare type MapValue<T extends string = string> = Map<T, NodeValues>;
export declare class MapNode<T extends string = string> extends AbstractNode<NodeTypes.Map, MapSchema<T>, MapValue<T>> {
    constructor();
    private readonly iterable;
    addIterable(iterable: [T, NodeSchemas]): void;
    setSchema(schema: MapSchema<T>): this;
    getSchema(): {
        type: NodeTypes.Map;
        iterable: [T, import("./UnknownNode").UnknownSchema | import("./UndefinedNode").UndefinedSchema | import("./NullNode").NullSchema | import("./StringNode").StringSchema<string> | import("./NumberNode").NumberSchema<number> | import("./BooleanNode").BooleanSchema<boolean> | import("./ObjectNode").ObjectSchema<string> | import("./ArrayNode").ArraySchema | import("./FunctionNode").FunctionSchema | import("./RegExpNode").RegExpSchema | import("./SymbolNode").SymbolSchema | import("./BigIntNode").BigIntSchema<string | number | bigint | boolean> | MapSchema<string> | import("./SetNode").SetSchema | import("./WeakMapNode").WeakSchema | import("./WeakSetNode").WeakSetSchema | import("./RouterNode").RouterSchema | import("./PiniaNode").PiniaSchema | import("./PiniaLinkNode").PiniaLinkSchema | import("./MaterialNode").MaterialSchema | import("./PageNode").PageSchema | import("./ReactiveByPiniaNode").ReactiveByPiniaSchema | import("./ProjectNode").ProjectSchema][];
    };
    getValue(): Map<T, unknown>;
}
