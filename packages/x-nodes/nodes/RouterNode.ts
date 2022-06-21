import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { StringNode, StringSchema } from "./StringNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Router]: {
      schema: RouterSchema;
      value: RouterValue;
    };
  }
}

export interface PageConfig {
  id: string;
  title: string;
  path: string;
}

export interface RouterSchema {
  type: NodeTypes.Router;
  mode: RouterValue["mode"];
  base: StringSchema;
  pages: Array<PageConfig>;
}

export type RouterValue = {
  mode: "hash" | "history" | "memory";
  base: string;
  pages: RouterSchema["pages"];
};

export class RouterNode extends AbstractNode<NodeTypes.Router> {
  constructor() {
    super(NodeTypes.Router);
  }
  private mode: RouterSchema["mode"] = "hash";
  private base = new StringNode().setValue("/");
  private pages: RouterSchema["pages"] = [];

  addPage(page: PageConfig) {
    this.pages.push(page);
    return this;
  }

  setMode(mode: RouterValue["mode"]) {
    this.mode = mode;
    return this;
  }

  getMode() {
    return this.mode;
  }

  setSchema(schema: RouterSchema): this {
    this.mode = schema.mode;
    this.base.setValue(schema.base.value);
    this.pages = [...schema.pages];
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      mode: this.mode,
      base: this.base.getSchema(),
      pages: this.pages
    };
  }

  getValue() {
    return {
      mode: this.mode,
      base: this.base.getValue(),
      pages: this.pages
    };
  }
}

AbstractNode.setParser(RouterNode);
