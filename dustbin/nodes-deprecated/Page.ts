import type { TypeSchemaCollection } from "./Index";
import type { TypeMaterialConfig } from "../material";
import AbstractNode from "./Abstract";
import { StringNode, StringSchema } from "./String";
import { ArrayNode, ArraySchema } from "./Array";
import { ObjectNode, ObjectSchema } from "./Object";
import { parseValue } from "./utils";

export type PageConfig = {
  id: string;
  title: string;
  config: TypeMaterialConfig;
};

export type PageSchema = {
  type: "Page";
  id: StringSchema;
  title: StringSchema;
  version: StringSchema;
  src: StringSchema;
  style: ObjectSchema;
  props: ObjectSchema;
  commonProps: ObjectSchema;
  emits: ArraySchema;
  listeners: ArraySchema;
  slots: ObjectSchema<
    Partial<{
      default: ArraySchema<PageSchema, TypeMaterialConfig>;
      [x: string]: ArraySchema<PageSchema, TypeMaterialConfig>;
    }>
  >;
  $$?: PageConfig | null;
};

export function isPageNode(schema: TypeSchemaCollection): schema is PageSchema {
  return schema.type === "Page";
}

export class PageNode extends AbstractNode<PageSchema> {
  constructor() {
    super({
      type: "Page",
      id: new StringNode().getSchema(),
      title: new StringNode().getSchema(),
      version: new StringNode().getSchema(),
      src: new StringNode().getSchema(),
      style: new ObjectNode().getSchema(),
      props: new ObjectNode().getSchema(),
      commonProps: new ObjectNode().getSchema(),
      emits: new ArrayNode().getSchema(),
      listeners: new ArrayNode().getSchema(),
      slots: new ObjectNode().getSchema()
    });
  }
  isValidNode() {
    return isPageNode(this.schema);
  }
  getValue(): PageConfig {
    return {
      id: parseValue(this.schema.id),
      title: parseValue(this.schema.title),
      config: {
        version: parseValue(this.schema.version),
        src: parseValue(this.schema.src),
        style: parseValue(this.schema.style),
        props: parseValue(this.schema.props),
        commonProps: parseValue(this.schema.commonProps),
        emits: parseValue(this.schema.emits),
        listeners: parseValue(this.schema.listeners),
        slots: parseValue(this.schema.slots)
      }
    };
  }
}
