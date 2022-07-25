import type { TypeSchemaCollection } from "./Index";
import type { PageConfig, PageSchema } from "./Page";
import type { ObjectSchema } from "./Object";
import AbstractNode from "./Abstract";
import { StringNode, StringSchema } from "./String";
import { ArrayNode, ArraySchema } from "./Array";
import { parseValue } from "./utils";

export type RouterConfig = {
  mode: "hash" | "history";
  routes: Array<{ name: string; path: string; page: PageConfig }>;
};

export type RouterSchema = {
  type: "Router";
  mode: StringSchema<"hash" | "history">;
  routes: ArraySchema<
    ObjectSchema<{
      name: StringSchema;
      path: StringSchema;
      page: PageSchema;
    }>,
    RouterConfig["routes"][number]
  >;
  $$?: RouterConfig | null;
};

export function isRouterNode(schema: TypeSchemaCollection): schema is RouterSchema {
  return schema.type === "Router";
}

export class SymbolNode extends AbstractNode<RouterSchema> {
  constructor(schema?: RouterSchema) {
    super({
      type: "Router",
      mode: <RouterSchema["mode"]>new StringNode().setValue("hash").getSchema(),
      routes: <RouterSchema["routes"]>new ArrayNode().getSchema()
    });
    if (schema) {
      this.setSchema(schema);
    }
  }

  isValidNode() {
    return isRouterNode(this.schema);
  }

  getValue(): RouterConfig {
    return {
      mode: parseValue<StringSchema<"hash" | "history">>(this.schema.mode),
      routes: parseValue<RouterSchema["routes"]>(this.schema.routes)
    };
  }
}
