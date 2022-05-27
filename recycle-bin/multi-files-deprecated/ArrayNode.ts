import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes, parseValue } from "./core";

const type = SchemaTypes.Array;

function isValid(schema: ISchema): schema is Schema<ArrayNode> {
  return schema.type === type && schema.elements instanceof Array;
}

export default class ArrayNode extends AbstractNode {
  protected readonly type = type;
  private readonly elements: Array<ISchema> = [];

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  addElement(element: typeof this.elements[number]) {
    this.elements.push(element);
    return this;
  }

  setElements(elements: typeof this.elements) {
    elements.forEach(this.addElement);
    return this;
  }

  setSchema(schema: ISchema) {
    if (isValid(schema)) {
      schema.elements.forEach(ele => this.addElement(ele));
    }
    return this;
  }

  getSchema() {
    return {
      type,
      elements: this.elements
    };
  }

  getValue<T = unknown>(): T[] {
    return this.elements.map<T>(ele => <T>parseValue(ele));
  }
}
