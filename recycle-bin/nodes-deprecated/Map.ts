import type { TypeSchemaCollection } from "./Index";
import AbstractNode from "./Abstract";
import { parseValue } from "./utils";

export type MapSchema = {
  type: "Map";
  iterable: [string, TypeSchemaCollection][];
  $$?: Map<string, unknown>;
};

export function isMapNode(schema: TypeSchemaCollection): schema is MapSchema {
  return schema.type === "Map" && schema.iterable instanceof Array;
}

export class MapNode extends AbstractNode<MapSchema> {
  constructor() {
    super({
      type: "Map",
      iterable: []
    });
  }

  isValidNode() {
    return isMapNode(this.schema);
  }

  addIterable(val: MapSchema["iterable"][number]) {
    this.schema.iterable.push(val);
    return this;
  }

  getValue() {
    return new Map(this.schema.iterable.map(([key, schema]) => [key, parseValue(schema)]));
  }
}
