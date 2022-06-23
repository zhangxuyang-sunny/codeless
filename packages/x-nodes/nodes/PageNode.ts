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
  vid: string;
  title: string;
  version: string;
  material: MaterialSchema;
};

export type PageValue = {
  vid: string;
  title: string;
  version: string;
  material: MaterialValue;
};

// 页面节点
export class PageNode extends AbstractNode<NodeTypes.Page> {
  constructor() {
    super(NodeTypes.Page);
  }
  private vid = "";
  private title = "";
  private version = "";
  private readonly material = new MaterialNode(); // 页面也是一种物料

  setVid(vid: string) {
    this.vid = vid;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setVersion(version: string) {
    this.version = version;
    return this;
  }

  setSchema(schema: PageSchema) {
    const { vid, material } = schema;
    this.vid = vid;
    this.material.setSchema(material);
    return this;
  }

  getTitle() {
    return this.title;
  }

  getVid() {
    return this.vid;
  }

  getVersion() {
    return this.version;
  }

  getSchema(): PageSchema {
    return {
      type: this.type,
      vid: this.vid,
      title: this.title,
      version: this.version,
      material: this.material.getSchema()
    };
  }

  getValue(): PageValue {
    return {
      vid: this.vid,
      title: this.title,
      version: this.version,
      material: this.material.getValue()
    };
  }
}

AbstractNode.setParser(PageNode);
