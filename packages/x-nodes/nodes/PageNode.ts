import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { StringNode, StringSchema } from "./StringNode";
import { MaterialNode, MaterialSchema, MaterialValue } from "./MaterialNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Page]: {
      schema: PageSchema;
      value: PageValue;
    };
  }
}

// 页面协议继承于物料协议，增加了 urlPath 作为路由 url 路径
export type PageSchema = Omit<MaterialSchema, "type"> & {
  type: NodeTypes.Page;
  urlPath: StringSchema;
};

export type PageValue = MaterialValue & {
  urlPath: string;
};

// 页面节点
export class PageNode extends AbstractNode<NodeTypes.Page> {
  constructor() {
    super(NodeTypes.Page);
  }
  private urlPath = new StringNode().setValue("/");
  private material = new MaterialNode(); // 页面也是一种物料

  setId(id: string) {
    this.material.setId(id);
    return this;
  }

  setKey(key: string) {
    this.material.setKey(key);
    return this;
  }

  setTitle(title: string) {
    this.material.setTitle(title);
    return this;
  }
  setVersion(version: string) {
    this.material.setVersion(version);
    return this;
  }

  setUrlPath(urlPath: string) {
    this.urlPath.setValue(urlPath);
    return this;
  }

  setSchema(schema: PageSchema) {
    const { urlPath, ...materialSchema } = schema;
    this.urlPath.setSchema(urlPath);
    this.material.setSchema({
      ...materialSchema,
      type: NodeTypes.Material // 覆盖 NodeTypes.Page
    });
    return this;
  }

  getSchema(): PageSchema {
    return {
      ...this.material.getSchema(),
      type: this.type,
      urlPath: this.urlPath.getSchema()
    };
  }

  getValue(): PageValue {
    return {
      ...this.material.getValue(),
      urlPath: this.urlPath.getValue()
    };
  }
}

AbstractNode.setParser(PageNode);
