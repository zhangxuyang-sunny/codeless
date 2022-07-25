import { AbstractNode } from "./AbstractNode";
import { NodeTypes } from "./enums";
import { JSValueTypes } from "./JSValueNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Binding]: {
      schema: BindingSchema;
      value: BindingValue;
    };
  }
}

export interface BindingSchema {
  type: NodeTypes.Binding;
  dataType: JSValueTypes;
  path: string;
}

export type BindingValue = BindingSchema;

export class BindingNode extends AbstractNode<NodeTypes.Binding> {
  private dataType: JSValueTypes = NodeTypes.Null;
  private path = "";
  constructor() {
    super(NodeTypes.Binding);
  }
  setSchema(schema: BindingSchema): this {
    this.dataType = schema.dataType;
    this.path = schema.path;
    return this;
  }
  getSchema(): BindingSchema {
    return {
      type: this.type,
      dataType: this.dataType,
      path: this.path
    };
  }
  getValue(): BindingValue {
    return this.getSchema();
  }
}

AbstractNode.setParser(BindingNode);
