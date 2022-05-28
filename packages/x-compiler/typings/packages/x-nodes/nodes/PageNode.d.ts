import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
import { StringSchema } from "./StringNode";
import { MaterialSchema, MaterialValue } from "./MaterialNode";
declare global {
    interface NodeSchema {
        [NodeTypes.Page]: {
            schema: PageSchema;
            value: PageValue;
        };
    }
}
export declare type PageSchema = Omit<MaterialSchema, "type"> & {
    type: NodeTypes.Page;
    urlPath: StringSchema;
};
export declare type PageValue = MaterialValue & {
    urlPath: string;
};
export declare class PageNode extends AbstractNode<NodeTypes.Page> {
    constructor();
    private urlPath;
    private material;
    setId(id: string): this;
    setKey(key: string): this;
    setTitle(title: string): this;
    setVersion(version: string): this;
    setUrlPath(urlPath: string): this;
    setSchema(schema: PageSchema): this;
    getSchema(): PageSchema;
    getValue(): PageValue;
}
