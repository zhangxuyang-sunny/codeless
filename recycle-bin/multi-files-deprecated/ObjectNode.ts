import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { parseValue, SchemaTypes } from "./core";

const type = SchemaTypes.Object;

function isValid(schema: ISchema): schema is Schema<ObjectNode> {
  return schema.type === type && typeof schema.properties === "object";
}

export default class ObjectNode extends AbstractNode {
  protected readonly type = type;
  private properties: Record<string, ISchema> = {};

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setProperty(key: string, property: ISchema) {
    this.properties[key] = property;
  }

  // 批量添加 properties，若想重置请先执行 resetProperties
  setProperties(properties: typeof this.properties) {
    for (const k in properties) {
      this.setProperty(k, properties[k]);
    }
  }

  // delete 改变对象形状，性能不好，少用
  deleteProperty(key: string) {
    delete this.properties[key];
  }

  // 重置 properties
  resetProperties() {
    this.properties = {};
  }

  setSchema(schema: Schema<ObjectNode>) {
    if (isValid(schema)) {
      this.setProperties(schema.properties);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      properties: this.properties
    };
  }

  getValue() {
    return Object.entries(this.properties) //
      .reduce<Record<string, unknown>>((obj, [property, schema]) => {
        obj[property] = parseValue(schema);
        return obj;
      }, {});
  }
}
