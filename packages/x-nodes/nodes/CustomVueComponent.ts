import { AbstractNode } from "../common/AbstractNode";
import { NodeTypes } from "../common/enums";

declare global {
  interface NodeSchema {
    [NodeTypes.CustomVueComponent]: {
      schema: CustomVueComponentSchema;
      value: CustomVueComponentValue;
    };
  }
}

export type CustomVueComponentSchema = {
  type: NodeTypes.CustomVueComponent;
  code: string;
};

export type CustomVueComponentValue = string;

export class CustomVueComponent extends AbstractNode<NodeTypes.CustomVueComponent> {
  constructor() {
    super(NodeTypes.CustomVueComponent);
  }

  private code = "";

  setSchema(schema: CustomVueComponentSchema) {
    this.code = schema.code;
    return this;
  }
  getSchema(): CustomVueComponentSchema {
    return {
      type: this.type,
      code: this.code
    };
  }
  getValue(): CustomVueComponentValue {
    throw new Error("Method not implemented.");
  }
}
