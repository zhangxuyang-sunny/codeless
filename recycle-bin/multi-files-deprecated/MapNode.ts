import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Map;

function isValid(schema: ISchema): schema is Schema<MapNode> {
  return schema.type === type && schema.iterable instanceof Array;
}

export default class MapNode extends AbstractNode {
  protected readonly type = type;
  private readonly iterable: [string, ISchema][] = [];

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  addIterable(iterable: typeof this.iterable[number]) {
    this.iterable.push(iterable);
  }

  setSchema(schema: Schema<MapNode>) {
    if (isValid(schema)) {
      schema.iterable.forEach(this.addIterable);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      iterable: this.iterable
    };
  }

  getValue() {
    return new Map(this.iterable);
  }
}
