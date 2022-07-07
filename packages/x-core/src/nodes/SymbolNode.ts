import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Symbol]: {
      schema: SymbolSchema;
      value: SymbolValue;
    };
  }
}

export interface SymbolSchema {
  type: NodeTypes.Symbol;
  description: string;
}

export type SymbolValue = symbol;

export class SymbolNode extends AbstractNode<NodeTypes.Symbol> {
  constructor() {
    super(NodeTypes.Symbol);
  }
  private description = "";

  setDescription(desc: string) {
    this.description = desc;
    return this;
  }

  setSchema(schema: SymbolSchema) {
    this.setDescription(schema.description);
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      description: this.description
    };
  }

  getValue() {
    return Symbol(this.description);
  }
}

AbstractNode.setParser(SymbolNode);
