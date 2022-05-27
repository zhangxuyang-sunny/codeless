import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";
import StringNode from "./StringNode";
import ObjectNode from "./ObjectNode";

const type = SchemaTypes.Pinia;

function isValid(schema: ISchema): schema is Schema<PiniaNode> {
  return schema.type === type && ["key", "state", "getters", "actions"].every(k => k in schema);
}

export default class PiniaNode extends AbstractNode {
  protected readonly type = type;
  private key = new StringNode();
  private state = new ObjectNode();
  private getters = new ObjectNode();
  private actions = new ObjectNode();

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setSchema(schema: Schema<PiniaNode>) {
    if (isValid(schema)) {
      this.state.resetProperties();
      this.getters.resetProperties();
      this.actions.resetProperties();
      this.key.setValue(schema.key.value);
      this.state.setProperties(schema.state.properties);
      this.getters.setProperties(schema.getters.properties);
      this.actions.setProperties(schema.actions.properties);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      key: this.key.getSchema(),
      state: this.state.getSchema(),
      getters: this.getters.getSchema(),
      actions: this.actions.getSchema()
    };
  }

  getValue() {
    return {
      key: this.key.getValue(),
      state: this.state.getValue(),
      getters: this.getters.getValue(),
      actions: this.actions.getValue()
    };
  }
}
