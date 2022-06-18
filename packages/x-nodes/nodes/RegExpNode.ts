import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.RegExp]: {
      schema: RegExpSchema;
      value: RegExpValue;
    };
  }
}

export interface RegExpSchema {
  type: NodeTypes.RegExp;
  pattern: Parameters<typeof RegExp>[0];
  flag: Parameters<typeof RegExp>[1] | undefined;
}

export type RegExpValue = RegExp;

export class RegExpNode extends AbstractNode<NodeTypes.RegExp> {
  constructor() {
    super(NodeTypes.RegExp);
  }
  private pattern: RegExpSchema["pattern"] = "";
  private flag: RegExpSchema["flag"];

  setPattern(pattern: Parameters<typeof RegExp>[0]) {
    this.pattern = pattern;
    return this;
  }

  setFlag(flag: Parameters<typeof RegExp>[1]) {
    this.flag = flag;
    return this;
  }

  setSchema(schema: RegExpSchema) {
    this.pattern = schema.pattern;
    this.flag = schema.flag;
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      pattern: this.pattern,
      flag: this.flag
    };
  }

  getValue() {
    return new RegExp(this.pattern, this.flag);
  }
}

AbstractNode.setParser(RegExpNode);
