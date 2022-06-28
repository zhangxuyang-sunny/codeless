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

export interface ViewOption {
  pageId: string;
  title: string;
  path: string;
}

export interface RouterSchema {
  type: NodeTypes.Router;
  mode: RouterValue["mode"];
  base: StringSchema;
  views: ViewOption[];
}

export type RouterValue = {
  mode: "hash" | "history" | "memory";
  base: string;
  views: ViewOption[];
};

export class RouterNode extends AbstractNode<NodeTypes.Router> {
  constructor() {
    super(NodeTypes.Router);
  }
  private base = new StringNode().setValue("/");
  private mode: RouterSchema["mode"] = "hash";
  private views: ViewOption[] = [];

  addPage(page: ViewOption) {
    this.views.push(page);
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
    this.base.setValue(schema.base.value);
    this.mode = schema.mode;
    this.views = [...schema.views];
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      mode: this.mode,
      base: this.base.getSchema(),
      views: this.views
    };
  }

  getValue() {
    return {
      mode: this.mode,
      base: this.base.getValue(),
      views: this.views
    };
  }
}

AbstractNode.setParser(RouterNode);
