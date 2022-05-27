import type { TypeSchemaCollection } from "./Index";

interface IAbstractNode<S extends TypeSchemaCollection, V extends S["$$"] = S["$$"]> {
  isValidNode(): boolean;
  setSchema(schema: S): this;
  getValue(): V;
  getSchema(): S;
}

export default abstract class AbstractNode<
  S extends TypeSchemaCollection,
  V extends S["$$"] = S["$$"]
> implements IAbstractNode<S, V>
{
  protected schema: S;
  constructor(schema: S) {
    this.schema = schema;
  }
  // 生成 value
  abstract getValue(): V;
  // 节点校验
  abstract isValidNode(): boolean;

  setSchema(schema: S) {
    this.schema = schema;
    return this;
  }

  getSchema() {
    return this.schema;
  }
}
