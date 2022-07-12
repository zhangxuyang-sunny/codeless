import { NodeTypes } from "../enums";
import { AbstractNode, BaseSchema } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Set]: {
      schema: SetSchema;
      value: SetValue;
    };
  }
}

export interface SetSchema extends BaseSchema {
  type: NodeTypes.Set;
  elements: NodeSchemas[];
}

export type SetValue = Set<NodeValues>;

export class SetNode extends AbstractNode<NodeTypes.Set> {
  constructor() {
    super(NodeTypes.Set);
  }
  private elements: SetSchema["elements"] = [];

  addElement(element: NodeSchemas) {
    this.elements.push(element);
  }

  setSchema(schema: SetSchema) {
    this.elements = schema.elements;
    return this;
  }

  getSchema() {
    return {
      ...super.getBaseSchema(),
      elements: this.elements
    };
  }

  getValue() {
    const set = new Set<NodeValues>();
    this.elements.forEach((element) => {
      set.add(AbstractNode.parseValue(element));
    });
    return set;
  }
}

AbstractNode.setParser(SetNode);
