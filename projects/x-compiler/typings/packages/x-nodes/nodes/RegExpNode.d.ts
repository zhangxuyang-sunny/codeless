import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.RegExp]: {
            schema: RegExpSchema;
            value: RegExpValue;
        };
    }
}
export interface RegExpSchema {
    type: NodeTypes.RegExp;
    pattern: Parameters<typeof RegExp>[0];
    flag: Parameters<typeof RegExp>[1] | undefined;
}
export declare type RegExpValue = RegExp;
export declare class RegExpNode extends AbstractNode<NodeTypes.RegExp> {
    constructor();
    private pattern;
    private flag;
    setPattern(pattern: Parameters<typeof RegExp>[0]): this;
    setFlag(flag: Parameters<typeof RegExp>[1]): this;
    setSchema(schema: RegExpSchema): this;
    getSchema(): {
        type: NodeTypes.RegExp;
        pattern: string | RegExp;
        flag: string;
    };
    getValue(): RegExp;
}
