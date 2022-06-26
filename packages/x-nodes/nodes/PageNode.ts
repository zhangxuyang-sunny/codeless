import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { MaterialNode, MaterialSchema, MaterialValue } from "./MaterialNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Page]: {
      schema: PageSchema;
      value: PageValue;
    };
  }
}

// 页面协议继承于物料协议
// vid 字段用于项目和路由绑定
export type PageSchema = {
  type: NodeTypes.Page;
  title: string;
  material: MaterialSchema;
};

export type PageValue = {
  title: string;
  material: MaterialValue;
};

// 页面节点
export class PageNode extends AbstractNode<NodeTypes.Page> {
  constructor() {
    super(NodeTypes.Page);
  }
  private title = "";
  private readonly material = new MaterialNode(); // 页面也是一种物料

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setSchema(schema: PageSchema) {
    const { title, material } = schema;
    this.title = title;
    this.material.setSchema(material);
    return this;
  }

  setMaterial(schema: MaterialSchema) {
    this.material.setSchema(schema);
    return this;
  }

  getTitle() {
    return this.title;
  }

  getSchema(): PageSchema {
    return {
      type: this.type,
      title: this.title,
      material: this.material.getSchema()
    };
  }

  getValue(): PageValue {
    return {
      title: this.title,
      material: this.material.getValue()
    };
  }
}

AbstractNode.setParser(PageNode);
