import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Set]: {
            schema: SetSchema;
            value: SetValue;
        };
    }
}
export interface SetSchema {
    type: NodeTypes.Set;
    elements: NodeSchemas[];
}
export declare type SetValue<T extends NodeValues = unknown> = Set<T>;
export declare class SetNode extends AbstractNode<NodeTypes.Set> {
    constructor();
    private elements;
    addElement(element: NodeSchemas): void;
    setSchema(schema: SetSchema): this;
    getSchema(): {
        type: NodeTypes.Set;
        elements: (import("./UnknownNode").UnknownSchema | import("./UndefinedNode").UndefinedSchema | import("./NullNode").NullSchema | import("./StringNode").StringSchema<string> | import("./NumberNode").NumberSchema<number> | import("./BooleanNode").BooleanSchema<boolean> | import("./ObjectNode").ObjectSchema<string> | import("./ArrayNode").ArraySchema | import("./FunctionNode").FunctionSchema | import("./RegExpNode").RegExpSchema | import("./SymbolNode").SymbolSchema | import("./BigIntNode").BigIntSchema<string | number | bigint | boolean> | import("./MapNode").MapSchema<string> | SetSchema | import("./WeakMapNode").WeakSchema | import("./WeakSetNode").WeakSetSchema | import("./RouterNode").RouterSchema | import("./PiniaNode").PiniaSchema | import("./PiniaLinkNode").PiniaLinkSchema | import("./MaterialNode").MaterialSchema | import("./PageNode").PageSchema | import("./ReactiveByPiniaNode").ReactiveByPiniaSchema | import("./ProjectNode").ProjectSchema)[];
    };
    getValue(): Set<unknown>;
}
