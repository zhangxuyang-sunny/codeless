import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Symbol]: {
            schema: SymbolSchema;
            value: SymbolValue;
        };
    }
}
export interface SymbolSchema {
    type: NodeTypes.Symbol;
    description: string;
}
export declare type SymbolValue = symbol;
export declare class SymbolNode extends AbstractNode<NodeTypes.Symbol> {
    constructor();
    private description;
    setDescription(desc: string): this;
    setSchema(schema: SymbolSchema): this;
    getSchema(): {
        type: NodeTypes.Symbol;
        description: string;
    };
    getValue(): symbol;
}
