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

export interface RouterSchema {
  type: NodeTypes.Router;
  mode: RouterValue["mode"];
  base: StringSchema;
}

export type RouterValue = {
  mode: "hash" | "history" | "memory";
  base: string;
};

export class RouterNode extends AbstractNode<NodeTypes.Router> {
  constructor() {
    super(NodeTypes.Router);
  }
  private mode: RouterSchema["mode"] = "hash";
  private base = new StringNode().setValue("/");

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
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      mode: this.mode,
      base: this.base.getSchema()
    };
  }

  getValue() {
    return {
      mode: this.mode,
      base: this.base.getValue()
    };
  }
}

AbstractNode.setParser(RouterNode);
