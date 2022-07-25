import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Set;

function isValid(schema: ISchema): schema is Schema<SetNode> {
  return schema.type === type && schema.iterable instanceof Array;
}

export default class SetNode extends AbstractNode {
  protected readonly type = type;
  private elements: Array<ISchema> = [];

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  addIterable(element: typeof this.elements[number]) {
    this.elements.push(element);
  }

  setSchema(schema: Schema<SetNode>) {
    if (isValid(schema)) {
      this.elements = schema.iterable;
    }
    return this;
  }

  getSchema() {
    return {
      type,
      iterable: this.elements
    };
  }

  getValue() {
    return new Set(this.elements);
  }
}
