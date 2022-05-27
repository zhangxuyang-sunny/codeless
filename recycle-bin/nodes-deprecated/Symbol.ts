import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type SymbolSchema = {
  type: "Symbol";
  description: Parameters<typeof Symbol>[0];
  $$?: symbol;
};

export function isSymbolNode(schema: TypeSchemaCollection): schema is SymbolSchema {
  return schema.type === "Symbol" && ["string", "number"].includes(typeof schema.description);
}

export class SymbolNode extends AbstractNode<SymbolSchema> {
  constructor(schema?: SymbolSchema) {
    super({
      type: "Symbol",
      description: ""
    });
    if (schema) {
      this.setSchema(schema);
    }
  }

  isValidNode() {
    return isSymbolNode(this.schema);
  }

  setDescription(description: SymbolSchema["description"]) {
    this.schema.description = description;
    return this;
  }

  getValue() {
    return Symbol(this.schema.description);
  }
}
