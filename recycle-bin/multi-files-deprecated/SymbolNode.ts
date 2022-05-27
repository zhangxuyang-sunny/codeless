import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Symbol;

function isValid(schema: ISchema): schema is Schema<SymbolNode> {
  return schema.type === type && typeof schema.description === "string";
}

export default class SymbolNode extends AbstractNode {
  protected readonly type = type;
  private description = "";

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setDescription(desc: string) {
    this.description = desc;
    return this;
  }

  setSchema(schema: Schema<SymbolNode>) {
    if (isValid(schema)) {
      this.setDescription(schema.description);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      description: this.description
    };
  }

  getValue() {
    return Symbol(this.description);
  }
}
