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

type TypePlatformThis<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  datasets: T;
};

export type TypePlatformFunction = (this: TypePlatformThis) => unknown;

// 数据节点抽象类
export abstract class AbstractNode<
  T extends NodeTypes = NodeTypes,
  S extends NodeSchemas = NodeSchemas<T>,
  V extends NodeValues = NodeValues<T>
> {
  constructor(protected readonly type: T) {}
  public getType() {
    return this.type;
  }

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
  // 平台上下文挂载点
  private static context: TypePlatformThis = {
    datasets: {}
  };
  // 设置平台上下文
  static setContext(context: TypePlatformThis) {
    this.context = context;
  }
  // 获取平台上下文
  static getContext() {
    return this.context;
  }
  // 内置包
  private static packages = new Map<string, unknown>();
  static getPackage<T>(key: string) {
    return <T>this.packages.get(key);
  }
  // 设置包数据
  static setPackage<T>(key: string, pkg: T) {
    this.packages.set(key, pkg);
  }

  /**
   * 解析所有支持的 schema 数据
   * ```js
   * // 每个 node 节点需要使用`AbstractNode.setParser(nodes)`方法注册
   * AbstractNode.setParser(XxxxxNode);
   * ```
   * @param schema
   * @returns
   */
  static parseValue(schema: NodeSchemas) {
    const Parser = this.parsers.get(schema.type);
    if (!Parser) {
      console.warn(`[parseValue]: type "${schema.type}" 不存在`, schema);
      return "Unknown Value";
    }
    const parser = new Parser();
    return parser.setSchema(schema).getValue();
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
