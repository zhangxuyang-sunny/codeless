import { v4 as uuid } from "uuid";
import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";
import ArrayNode from "./ArrayNode";
import ObjectNode from "./ObjectNode";
import StringNode from "./StringNode";

const type = SchemaTypes.Page;

function isValid(schema: ISchema): schema is Schema<PageNode> {
  return (
    schema.type === type &&
    [
      "title",
      "version",
      "src",
      "style",
      "props",
      "commonProps",
      "emits",
      "listeners",
      "slots"
    ].every(k => k in schema)
  );
}

export default class PageNode extends AbstractNode {
  protected readonly type = type;
  private readonly id = new StringNode().setValue(uuid());
  private readonly title = new StringNode().setValue("未命名页面");
  private readonly version = new StringNode().setValue("0.0.0");
  private readonly src = new StringNode();
  private readonly style = new ObjectNode();
  private readonly props = new ObjectNode();
  private readonly commonProps = new ObjectNode();
  private readonly emits = new ArrayNode();
  private readonly listeners = new ArrayNode();
  private readonly slots = new ObjectNode();

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setSchema(schema: Schema<PageNode>) {
    if (isValid(schema)) {
      this.id.setValue(schema.id.value);
      this.title.setValue(schema.title.value);
      this.version.setValue(schema.version.value);
      this.src.setValue(schema.src.value);
      this.style.setProperties(schema.style.properties);
      this.props.setProperties(schema.props.properties);
      this.commonProps.setProperties(schema.commonProps.properties);
      this.emits.setElements(schema.emits.elements);
      this.listeners.setElements(schema.listeners.elements);
      this.slots.setProperties(schema.slots.properties);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      id: this.id.getSchema(),
      title: this.title.getSchema(),
      version: this.version.getSchema(),
      src: this.src.getSchema(),
      style: this.style.getSchema(),
      props: this.props.getSchema(),
      commonProps: this.commonProps.getSchema(),
      emits: this.emits.getSchema(),
      listeners: this.listeners.getSchema(),
      slots: this.slots.getSchema()
    };
  }

  getValue() {
    return {
      id: this.id.getValue(),
      title: this.title.getValue(),
      version: this.version.getValue(),
      src: this.src.getValue(),
      style: this.style.getValue(),
      props: this.props.getValue(),
      commonProps: this.commonProps.getValue(),
      emits: this.emits.getValue(),
      listeners: this.listeners.getValue(),
      slots: this.slots.getValue()
    };
  }
}
