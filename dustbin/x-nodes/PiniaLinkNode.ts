import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

declare global {
  interface NodeSchema {
    [NodeTypes.PiniaLink]: {
      schema: PiniaLinkSchema;
      value: PiniaLinkValue;
    };
  }
}

export interface PiniaLinkSchema {
  type: NodeTypes.PiniaLink;
  key: string;
}

export type PiniaLinkValue = {
  key: string;
};

export class PiniaLinkNode extends AbstractNode<NodeTypes.PiniaLink> {
  constructor() {
    super(NodeTypes.PiniaLink);
  }
  private key = "";

  setValue(val: string) {
    this.key = val;
    return this;
  }

  setSchema(schema: PiniaLinkSchema) {
    this.key = schema.key;
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      key: this.key
    };
  }

  getValue() {
    return {
      key: this.key
    };
  }
}

AbstractNode.setParser(PiniaLinkNode);
