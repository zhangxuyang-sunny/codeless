/* eslint-disable @typescript-eslint/no-empty-interface */
// import type { ComputedRef } from "vue";
// import type { Store } from "pinia";
import { NodeTypes } from "./enums";

// type isEqual<X, Y> = X extends Y ? (Y extends X ? true : false) : false;
type ExcludeEqual<T, U> = T extends U ? (U extends T ? never : T) : T;

type BaseSchema = { type: NodeTypes };
type BaseNodeSchema = Record<NodeTypes, { schema: BaseSchema; value: unknown }>;

declare global {
  interface NodeSchema extends BaseNodeSchema {}
  type NodeSchemas<T extends NodeTypes = NodeTypes> = ExcludeEqual<
    NodeSchema[T]["schema"],
    BaseSchema
  >;
  type NodeValues<T extends NodeTypes = NodeTypes> = NodeSchema[T]["value"];
}

// // pinia store
// type TypePiniaStore<
//   T extends Record<string, unknown> = Record<string, unknown> //
// > = Store<
//   string,
//   T,
//   Record<string, FunctionConstructor>,
//   Record<string, FunctionConstructor>
// >;

// store
// type TypeStoreRecord<T = unknown> = Record<string, T>;

type TypePlatformThis<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  // piniaRecord: Record<string, TypePiniaStore<T>>;
  // piniaRecord: Record<string, T>;
  record: T;
};

export type TypePlatformFunction = (this: TypePlatformThis) => unknown;

// 数据节点抽象类
export abstract class AbstractNode<
  T extends NodeTypes = NodeTypes,
  S extends NodeSchemas = NodeSchemas<T>,
  V extends NodeValues = NodeValues<T>
> {
  constructor(type: T) {
    this.type = type;
  }
  protected readonly type: T;
  // 赋值 schema
  abstract setSchema(schema: S): this;
  // 获取 schema
  abstract getSchema(): S;
  // 获取解析结果
  abstract getValue(): V;

  // 节点解析器集合
  protected static parsers: Map<
    NodeTypes, //
    { new (): AbstractNode }
  > = new Map();
  static setParser(Parser: { new (): AbstractNode }) {
    const parser = new Parser();
    if (!AbstractNode.parsers.has(parser.type)) {
      AbstractNode.parsers.set(parser.type, Parser);
    }
  }
  // 全局上下文挂载点
  private static context: TypePlatformThis = {
    record: {}
  };
  // 内置包
  private static packages = new Map<string, unknown>();
  // 设置全局上下文
  static setContext(context: TypePlatformThis) {
    this.context = context;
  }
  // 获取平台上下文
  static getContext() {
    return this.context;
  }
  static getPackage<T>(key: string) {
    return <T>this.packages.get(key);
  }
  // // 增加 piniaStore
  // static setPiniaStore(key: string, store: TypePiniaStore) {
  //   this.context.record[key] = store;
  // }
  // 设置包数据
  static setPackage<T>(key: string, pkg: T) {
    this.packages.set(key, pkg);
  }
  static parseValue(schema: NodeSchemas) {
    const Parser = this.parsers.get(schema.type);
    if (!Parser) {
      console.warn(`[parseValue]: type "${schema.type}" 不存在`, schema);
      return "Unknown Value";
    }
    const parser = new Parser();
    return parser.setSchema(schema).getValue();
  }
  getType() {
    return this.type;
  }
}

declare global {
  interface Window {
    AbstractNode: typeof AbstractNode;
  }
}

try {
  if (window) {
    window.AbstractNode = AbstractNode;
  }
} catch {}
