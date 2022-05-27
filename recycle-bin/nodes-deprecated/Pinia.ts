import type { FunctionSchema, FunctionValue } from "./Function";
import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";
import { ObjectNode, ObjectSchema } from "./Object";
import { StringNode, StringSchema } from "./String";
import { parseValue } from "./utils";

export type PiniaSchema = {
  type: "Pinia";
  key: StringSchema;
  state: ObjectSchema;
  getters: ObjectSchema<FunctionSchema>;
  actions: ObjectSchema<FunctionSchema>;
  $$?: PiniaValue;
};

export type PiniaValue = {
  key: string;
  state: Record<string, TypeSchemaCollection["$$"]>;
  getters: Record<string, FunctionValue>;
  actions: Record<string, FunctionValue>;
};

export function isPiniaNode(schema: PiniaSchema): schema is PiniaSchema {
  return schema.type === "Pinia" && ["state", "getters", "actions"].every(item => schema[item]);
}

export class PiniaNode extends AbstractNode<PiniaSchema> {
  constructor(schema?: PiniaSchema) {
    super(
      schema || {
        type: "Pinia",
        key: new StringNode().schema,
        state: new ObjectNode().schema,
        getters: new ObjectNode<FunctionSchema>().schema,
        actions: new ObjectNode<FunctionSchema>().schema
      }
    );
  }

  isValidNode() {
    return isPiniaNode(this.schema);
  }

  getValue() {
    const key = parseValue(this.schema.key);
    const state = parseValue(this.schema.state);
    const getters = parseValue(this.schema.getters);
    const actions = parseValue(this.schema.actions);
    return {
      key,
      state,
      getters,
      actions
    };
  }
}
