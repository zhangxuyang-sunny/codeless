import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
import { RouterSchema, RouterValue } from "./RouterNode";
import { PiniaSchema, PiniaValue } from "./PiniaNode";
import { PageSchema, PageValue } from "./PageNode";
import { TypePackages } from "../../x-types";
declare global {
    interface NodeSchema {
        [NodeTypes.Project]: {
            schema: ProjectSchema;
            value: ProjectValue;
        };
    }
}
export interface ProjectSchema {
    type: NodeTypes.Project;
    router: RouterSchema;
    piniaList: PiniaSchema[];
    pageList: PageSchema[];
}
export interface ProjectValue {
    router: RouterValue;
    piniaList: PiniaValue[];
    pageList: PageValue[];
}
export declare class ProjectNode extends AbstractNode<NodeTypes.Project> {
    constructor();
    private readonly router;
    private readonly piniaList;
    private readonly pageList;
    setPackages(packages: TypePackages): this;
    addPinia(piniaSchema: PiniaSchema): void;
    addPage(pageSchema: PageSchema): void;
    setSchema(schema: ProjectSchema): this;
    getSchema(): ProjectSchema;
    getRouter(): {
        mode: "history" | "memory" | "hash";
        base: string;
    };
    getPiniaList(): PiniaValue<Record<string, unknown>>[];
    getPageList(): PageValue[];
    getValue(): ProjectValue;
}
