import { SchemaTypes } from "./core";

export type Schema<T extends AbstractNode> = ReturnType<T["getSchema"]>;
export type Value<T extends AbstractNode> = ReturnType<T["getValue"]>;

export interface ISchema {
  type: SchemaTypes;
  [x: string]: unknown;
}

// 数据节点抽象类
export default abstract class AbstractNode {
  protected abstract readonly type: SchemaTypes;
  abstract isValid(): boolean;
  abstract setSchema(schema: ISchema): this;
  abstract getSchema(): ISchema;
  abstract getValue(): unknown;
  getType() {
    return this.type;
  }
}
