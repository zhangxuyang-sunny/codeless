import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
import { StringSchema } from "./StringNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Router]: {
            schema: RouterSchema;
            value: RouterValue;
        };
    }
}
export interface RouterSchema {
    type: NodeTypes.Router;
    mode: RouterValue["mode"];
    base: StringSchema;
}
export declare type RouterValue = {
    mode: "hash" | "history" | "memory";
    base: string;
};
export declare class RouterNode extends AbstractNode<NodeTypes.Router> {
    constructor();
    private mode;
    private base;
    setMode(mode: RouterValue["mode"]): this;
    getMode(): "history" | "memory" | "hash";
    setSchema(schema: RouterSchema): this;
    getSchema(): {
        type: NodeTypes.Router;
        mode: "history" | "memory" | "hash";
        base: StringSchema<string>;
    };
    getValue(): {
        mode: "history" | "memory" | "hash";
        base: string;
    };
}
