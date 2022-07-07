import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";
import { JSValueSchemas } from "./JSValueNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Object]: {
      schema: ObjectSchema;
      value: ObjectValue;
    };
  }
}

export interface ObjectSchema<T extends PropertyKey = string> {
  type: NodeTypes.Object;
  properties: Record<T, JSValueSchemas>;
}

export type ObjectValue<T extends PropertyKey = string> = {
  [x in T]?: NodeValues;
};

export class ObjectNode<T extends PropertyKey = string> //
  extends AbstractNode<NodeTypes.Object, ObjectSchema<T>, ObjectValue<T>>
{
  constructor() {
    super(NodeTypes.Object);
  }
  private properties = new Map<T, JSValueSchemas>();

  setProperty(key: T, property: JSValueSchemas) {
    this.properties.set(key, property);
    return this;
  }

  // 批量添加 properties，若想重置请先执行 resetProperties
  setProperties(properties: ObjectSchema["properties"]) {
    for (const key in properties) {
      this.setProperty(<T>key, properties[key]);
    }
    return this;
  }

  deleteProperty(key: T) {
    this.properties.delete(key);
    return this;
  }

  // 重置 properties
  resetProperties() {
    this.properties.clear();
    return this;
  }

  setSchema(schema: ObjectSchema<T>) {
    this.setProperties(schema.properties);
    return this;
  }

  getSchema() {
    const properties: ObjectSchema<T>["properties"] = Object.create({});
    this.properties.forEach((item, key) => {
      properties[key] = item;
    });
    return {
      type: this.type,
      properties
    };
  }

  getValue() {
    const obj: Record<T, NodeValues> = Object.create({});
    this.properties.forEach((schema, key) => {
      obj[key] = AbstractNode.parseValue(schema);
    });
    return obj;
  }
}

AbstractNode.setParser(ObjectNode);

// // 测试推导 css 属性
// let a: ObjectNode<keyof Partial<CSSStyleDeclaration>>;

// const v = a.getValue();
