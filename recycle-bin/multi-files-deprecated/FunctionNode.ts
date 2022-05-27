import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";

const type = SchemaTypes.Function;

function isValid(schema: ISchema): schema is Schema<FunctionNode> {
  return schema.type === type && typeof schema.code === "string";
}

type PlatformThisType = {
  piniaStore: Record<string, unknown>;
};

export type PlatformFunction = (this: PlatformThisType) => unknown;

export default class FunctionNode extends AbstractNode {
  protected readonly type = type;
  private code = "";
  private context: PlatformThisType = {
    piniaStore: {}
  };

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setCode(code: string) {
    this.code = code;
  }

  // 设置函数生成上下文
  setContext(context: PlatformThisType) {
    this.context = context;
  }

  setSchema(schema: ISchema) {
    if (isValid(schema)) {
      this.code = schema.code;
    }
    return this;
  }

  getSchema() {
    return {
      type,
      code: this.code
    };
  }

  getValue(): PlatformFunction {
    return new Function(`return ${this.code}`).call(this.context);
  }
}
