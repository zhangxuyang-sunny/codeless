import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.PiniaLink]: {
            schema: PiniaLinkSchema;
            value: PiniaLinkValue;
        };
    }
}
export interface PiniaLinkSchema {
    type: NodeTypes.PiniaLink;
    key: string;
}
export declare type PiniaLinkValue = {
    key: string;
};
export declare class PiniaLinkNode extends AbstractNode<NodeTypes.PiniaLink> {
    constructor();
    private key;
    setValue(val: string): this;
    setSchema(schema: PiniaLinkSchema): this;
    getSchema(): {
        type: NodeTypes.PiniaLink;
        key: string;
    };
    getValue(): {
        key: string;
    };
}
