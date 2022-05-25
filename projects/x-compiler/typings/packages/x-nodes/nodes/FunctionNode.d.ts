import { NodeTypes } from "../enums";
import { AbstractNode, TypePlatformFunction } from "../AbstractNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Function]: {
            schema: FunctionSchema;
            value: FunctionValue;
        };
    }
}
export declare type FunctionSchema = {
    type: NodeTypes.Function;
    code: string;
    useStrict?: boolean;
};
export declare type FunctionValue<V extends () => unknown = () => unknown> = V;
export declare class FunctionNode extends AbstractNode<NodeTypes.Function> {
    constructor();
    private code;
    private useStrict;
    setCode(code: string): this;
    setStrict(state: boolean): this;
    setSchema(schema: FunctionSchema): this;
    getSchema(): {
        type: NodeTypes.Function;
        code: string;
    };
    getValue(): FunctionValue<TypePlatformFunction>;
}
