import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Set]: {
      schema: SetSchema;
      value: SetValue;
    };
  }
}

export interface SetSchema {
  type: NodeTypes.Set;
  elements: NodeSchemas[];
}

export type SetValue<T extends NodeValues = unknown> = Set<T>;

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
      type: this.type,
      elements: this.elements
    };
  }

  getValue() {
    const set = new Set();
    this.elements.forEach(element => {
      set.add(AbstractNode.parseValue(element));
    });
    return set;
  }
}

AbstractNode.setParser(SetNode);
