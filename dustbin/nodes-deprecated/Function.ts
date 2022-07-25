import type { TypePiniaStore } from "../config";
import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";

export type FunctionValue = FunctionConstructor;

export type FunctionSchema = {
  type: "Function";
  code: string;
  $$?: FunctionValue;
};

export function isFunctionNode(schema: TypeSchemaCollection): schema is FunctionSchema {
  return schema.type === "Function" && typeof schema.code === "string";
}

type TypeContext = {
  piniaRecord: Record<string, TypePiniaStore>;
};

export class FunctionNode extends AbstractNode<FunctionSchema> {
  // 函数的 this
  private thisContext?: TypeContext;
  constructor(thisContext: TypeContext) {
    super({
      type: "Function",
      code: ""
    });
    this.thisContext = thisContext;
  }

  isValidNode(): boolean {
    return isFunctionNode(this.schema);
  }

  getValue(): FunctionValue {
    return new Function("$this", ` return ${this.schema.code}`).call(this, this.thisContext);
  }
}
