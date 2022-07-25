import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";
import { parseValue } from "./utils";

export type SetSchema = {
  type: "Set";
  elements: TypeSchemaCollection[];
  $$?: Set<unknown>;
};

export function isSetNode(schema: TypeSchemaCollection): schema is SetSchema {
  return schema.type === "Set" && schema.elements instanceof Array;
}

export class SetNode extends AbstractNode<SetSchema> {
  constructor() {
    super({
      type: "Set",
      elements: []
    });
  }

  isValidNode() {
    return isSetNode(this.schema);
  }

  getValue() {
    return new Set(this.schema.elements.map(ele => parseValue(ele)));
  }
}
