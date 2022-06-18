import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Array]: {
      schema: ArraySchema;
      value: ArrayValue;
    };
  }
}

export type ArraySchema = {
  type: NodeTypes.Array;
  elements: NodeSchemas[];
};

export type ArrayValue = NodeValues[];

export class ArrayNode extends AbstractNode<NodeTypes.Array> {
  constructor() {
    super(NodeTypes.Array);
  }
  private readonly elements: NodeSchemas[] = [];

  addElement(element: NodeSchemas) {
    this.elements.push(element);
    return this;
  }

  setElements(elements: NodeSchemas[]) {
    elements.forEach(this.addElement);
    return this;
  }

  setSchema(schema: ArraySchema) {
    schema.elements.forEach((ele) => this.addElement(ele));
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      elements: this.elements
    };
  }

  getValue() {
    return this.elements.map((ele) => AbstractNode.parseValue(ele));
  }
}

AbstractNode.setParser(ArrayNode);
