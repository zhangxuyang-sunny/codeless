import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";
import { parseValue } from "./utils";

export type ArrayValue<T> = T[];

export interface ArraySchema<S extends TypeSchemaCollection = TypeSchemaCollection, V = unknown> {
  type: "Array";
  elements: S[];
  $$?: ArrayValue<V>;
}

export function isArrayNode(schema: TypeSchemaCollection): schema is ArraySchema {
  return schema.type === "Array" && schema.elements instanceof Array;
}

export class ArrayNode extends AbstractNode<ArraySchema> {
  constructor() {
    super({
      type: "Array",
      elements: []
    });
  }

  isValidNode(): boolean {
    return isArrayNode(this.schema);
  }

  setElements(elements: ArraySchema["elements"]) {
    this.schema.elements = elements;
    return this;
  }

  addElement(element: ArraySchema["elements"][number]) {
    this.schema.elements.push(element);
    return this;
  }

  getValue() {
    return this.schema.elements.map(element => parseValue(element));
  }
}
