import AbstractNode, { Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.PageLink;

function isValid(schema: Schema<PageLinkNode>): schema is Schema<PageLinkNode> {
  return schema.type === type && typeof schema.key === "string";
}

export default class PageLinkNode extends AbstractNode {
  protected readonly type = type;
  private key = "";

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setValue(val: string) {
    this.key = val;
    return this;
  }

  setSchema(schema: Schema<PageLinkNode>) {
    if (isValid(schema)) {
      this.key = schema.key;
    }
    return this;
  }

  getSchema() {
    return {
      type,
      key: this.key
    };
  }

  getValue() {
    return this.key;
  }
}
