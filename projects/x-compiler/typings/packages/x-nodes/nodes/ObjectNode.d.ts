import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Object]: {
            schema: ObjectSchema;
            value: ObjectValue;
        };
    }
}
export interface ObjectSchema<T extends PropertyKey = string> {
    type: NodeTypes.Object;
    properties: Record<T, NodeSchemas>;
}
export declare type ObjectValue<T extends PropertyKey = string> = {
    [x in T]?: NodeValues;
};
export declare class ObjectNode<T extends PropertyKey = string> extends AbstractNode<NodeTypes.Object, ObjectSchema<T>, ObjectValue<T>> {
    constructor();
    private properties;
    setProperty(key: T, property: NodeSchemas): this;
    setProperties(properties: ObjectSchema["properties"]): this;
    deleteProperty(key: T): this;
    resetProperties(): this;
    setSchema(schema: ObjectSchema<T>): this;
    getSchema(): {
        type: NodeTypes.Object;
        properties: Record<T, import("./UnknownNode").UnknownSchema | import("./UndefinedNode").UndefinedSchema | import("./NullNode").NullSchema | import("./StringNode").StringSchema<string> | import("./NumberNode").NumberSchema<number> | import("./BooleanNode").BooleanSchema<boolean> | ObjectSchema<string> | import("./ArrayNode").ArraySchema | import("./FunctionNode").FunctionSchema | import("./RegExpNode").RegExpSchema | import("./SymbolNode").SymbolSchema | import("./BigIntNode").BigIntSchema<string | number | bigint | boolean> | import("./MapNode").MapSchema<string> | import("./SetNode").SetSchema | import("./WeakMapNode").WeakSchema | import("./WeakSetNode").WeakSetSchema | import("./RouterNode").RouterSchema | import("./PiniaNode").PiniaSchema | import("./PiniaLinkNode").PiniaLinkSchema | import("./MaterialNode").MaterialSchema | import("./PageNode").PageSchema | import("./ReactiveByPiniaNode").ReactiveByPiniaSchema | import("./ProjectNode").ProjectSchema>;
    };
    getValue(): Record<T, unknown>;
}
