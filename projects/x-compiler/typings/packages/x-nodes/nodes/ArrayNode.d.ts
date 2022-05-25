import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Array]: {
            schema: ArraySchema;
            value: ArrayValue;
        };
    }
}
export declare type ArraySchema = {
    type: NodeTypes.Array;
    elements: NodeSchemas[];
};
export declare type ArrayValue = NodeValues[];
export declare class ArrayNode extends AbstractNode<NodeTypes.Array> {
    constructor();
    private readonly elements;
    addElement(element: NodeSchemas): this;
    setElements(elements: NodeSchemas[]): this;
    setSchema(schema: ArraySchema): this;
    getSchema(): {
        type: NodeTypes.Array;
        elements: (import("./UnknownNode").UnknownSchema | import("./UndefinedNode").UndefinedSchema | import("./NullNode").NullSchema | import("./StringNode").StringSchema<string> | import("./NumberNode").NumberSchema<number> | import("./BooleanNode").BooleanSchema<boolean> | import("./ObjectNode").ObjectSchema<string> | ArraySchema | import("./FunctionNode").FunctionSchema | import("./RegExpNode").RegExpSchema | import("./SymbolNode").SymbolSchema | import("./BigIntNode").BigIntSchema<string | number | bigint | boolean> | import("./MapNode").MapSchema<string> | import("./SetNode").SetSchema | import("./WeakMapNode").WeakSchema | import("./WeakSetNode").WeakSetSchema | import("./RouterNode").RouterSchema | import("./PiniaNode").PiniaSchema | import("./PiniaLinkNode").PiniaLinkSchema | import("./MaterialNode").MaterialSchema | import("./PageNode").PageSchema | import("./ReactiveByPiniaNode").ReactiveByPiniaSchema | import("./ProjectNode").ProjectSchema)[];
    };
    getValue(): unknown[];
}
