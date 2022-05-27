import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";
import { isObject, parseValue } from "./utils";

export type ObjectValue = { [x: PropertyKey]: unknown };

export interface ObjectSchema<
  P extends { [x: PropertyKey]: unknown } = { [x: PropertyKey]: TypeSchemaCollection }
> {
  type: "Object";
  properties: P;
  $$?: ObjectValue;
}

export function isObjectNode(schema: ObjectSchema): schema is ObjectSchema {
  return schema.type === "Object" && isObject(schema.properties);
}

export class ObjectNode<S extends TypeSchemaCollection> extends AbstractNode<ObjectSchema> {
  constructor() {
    super({
      type: "Object",
      properties: {}
    });
  }
  isValidNode(): boolean {
    return isObjectNode(this.schema);
  }
  setProperty(key: string, value: S) {
    this.schema.properties[key] = value;
    return this;
  }
  setProperties(properties: ObjectSchema["properties"]) {
    this.schema.properties = properties;
    return this;
  }
  getValue() {
    const { properties } = this.schema;
    const obj = Object.entries(properties) //
      .reduce<Record<string, S["$$"]>>((prev, [key, schema]) => {
        const config = parseValue(schema);
        prev[key] = config;
        return prev;
      }, {});
    return obj;
  }
}
