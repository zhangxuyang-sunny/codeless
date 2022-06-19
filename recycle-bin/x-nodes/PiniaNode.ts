// @ts-ignore
import type { DefineStoreOptions } from "pinia";
import { NodeTypes } from "../common/enums";
import { AbstractNode, TypePlatformFunction } from "../common/AbstractNode";
import { StringNode, StringSchema } from "./StringNode";
import { FunctionNode, FunctionSchema } from "./FunctionNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Pinia]: {
      schema: PiniaSchema;
      value: PiniaValue;
    };
  }
}

export interface PiniaSchema {
  type: NodeTypes.Pinia;
  key: StringSchema;
  state: Record<string, NodeSchemas>;
  getters: Record<string, FunctionSchema>;
  actions: Record<string, FunctionSchema>;
  // https://pinia.vuejs.org/api/interfaces/pinia.DefineStoreOptionsInPlugin.html#hydrate
  hydrate?: FunctionSchema;
}

export type PiniaValue<
  T extends Record<string, unknown> = Record<string, unknown>
> = DefineStoreOptions<
  string,
  T,
  Record<string, TypePlatformFunction>,
  Record<string, TypePlatformFunction>
>;

export class PiniaNode<
    T extends Record<string, unknown> = Record<string, unknown>
  > //
  extends AbstractNode<NodeTypes.Pinia, PiniaSchema, PiniaValue<T>>
{
  constructor() {
    super(NodeTypes.Pinia);
  }
  private key = new StringNode();
  private state: PiniaSchema["state"] = {};
  private getters: PiniaSchema["getters"] = {};
  private actions: PiniaSchema["actions"] = {};
  private hydrate: PiniaSchema["hydrate"] = new FunctionNode().getSchema();

  setSchema(schema: PiniaSchema) {
    this.key.setValue(schema.key.value);
    this.state = schema.state;
    this.getters = schema.getters;
    this.actions = schema.actions;
    this.hydrate = schema.hydrate;
    return this;
  }

  getSchema(): PiniaSchema {
    return {
      type: this.type,
      key: this.key.getSchema(),
      state: this.state,
      getters: this.getters,
      actions: this.actions,
      hydrate: this.hydrate
    };
  }

  getValue(): PiniaValue<T> {
    const mapFunc = (record: Record<string, FunctionSchema>) => {
      const obj: Record<string, TypePlatformFunction> = {};
      for (const key in record) {
        obj[key] = new FunctionNode().setSchema(record[key]).getValue();
      }
      return obj;
    };
    const state: Record<string, unknown> = <T>{};
    for (const key in this.state) {
      state[key] = AbstractNode.parseValue(this.state[key]);
    }
    return {
      id: this.key.getValue(),
      state: () => <T>state,
      getters: mapFunc(this.getters),
      actions: mapFunc(this.actions),
      hydrate: this.hydrate
        ? new FunctionNode().setSchema(this.hydrate).getValue()
        : undefined
    };
  }
}

AbstractNode.setParser(PiniaNode);
