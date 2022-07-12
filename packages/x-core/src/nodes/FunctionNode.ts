import { NodeTypes } from "../enums";
import { AbstractNode, BaseSchema, IPlatformFunction } from "./AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Function]: {
      schema: FunctionSchema;
      value: FunctionValue;
    };
  }
}

export interface FunctionSchema extends BaseSchema {
  type: NodeTypes.Function;
  code: string;
  useStrict?: boolean;
}

export type FunctionValue<V extends () => unknown = () => unknown> = V;

export class FunctionNode extends AbstractNode<NodeTypes.Function> {
  constructor() {
    super(NodeTypes.Function);
  }
  private code = "";
  private useStrict = false;

  setCode(code: string) {
    this.code = code;
    return this;
  }

  setStrict(state: boolean) {
    this.useStrict = state;
    return this;
  }

  setSchema(schema: FunctionSchema) {
    this.code = schema.code;
    this.useStrict = schema.useStrict || false;
    return this;
  }

  getSchema() {
    return {
      ...super.getBaseSchema(),
      code: this.code
    };
  }

  getValue<T extends IPlatformFunction>(): FunctionValue<T> {
    // eslint-disable-next-line no-new-func
    return Function(
      "context",
      `${this.useStrict ? '"use strict";\n' : ""}return ${this.code}`
    )(AbstractNode.getContext());
  }
}

AbstractNode.setParser(FunctionNode);
