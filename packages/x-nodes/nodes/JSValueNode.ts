import {
  UndefinedSchema,
  UndefinedNode,
  NullSchema,
  NullNode,
  StringSchema,
  StringNode,
  NumberSchema,
  NumberNode,
  BooleanSchema,
  BooleanNode,
  ObjectSchema,
  ObjectNode,
  ArraySchema,
  ArrayNode,
  FunctionSchema,
  FunctionNode,
  RegExpSchema,
  RegExpNode,
  SymbolSchema,
  SymbolNode,
  BigIntSchema,
  BigIntNode,
  MapSchema,
  MapNode,
  SetSchema,
  SetNode,
  WeakMapSchema,
  WeakMapNode,
  WeakSetSchema,
  WeakSetNode
} from "../index";
import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";

/**
 * JS 表达式节点类型集合
 */
export type JSValueTypes =
  | NodeTypes.Undefined
  | NodeTypes.Null
  | NodeTypes.String
  | NodeTypes.Number
  | NodeTypes.Boolean
  | NodeTypes.Object
  | NodeTypes.Array
  | NodeTypes.Function
  | NodeTypes.RegExp
  | NodeTypes.Symbol
  | NodeTypes.BigInt
  | NodeTypes.Map
  | NodeTypes.Set
  | NodeTypes.WeakMap
  | NodeTypes.WeakSet;

export type JSValueSchemas =
  | UndefinedSchema
  | NullSchema
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ObjectSchema
  | ArraySchema
  | FunctionSchema
  | RegExpSchema
  | SymbolSchema
  | BigIntSchema
  | MapSchema
  | SetSchema
  | WeakMapSchema
  | WeakSetSchema;

export type JSValueNodes =
  | UndefinedNode
  | NullNode
  | StringNode
  | NumberNode
  | BooleanNode
  | ObjectNode
  | ArrayNode
  | FunctionNode
  | RegExpNode
  | SymbolNode
  | BigIntNode
  | MapNode
  | SetNode
  | WeakMapNode
  | WeakSetNode;

const JSParserMapper: Record<
  JSValueTypes, //
  { new (): JSValueNodes }
> = Object.freeze({
  [NodeTypes.Undefined]: UndefinedNode,
  [NodeTypes.Null]: NullNode,
  [NodeTypes.String]: StringNode,
  [NodeTypes.Number]: NumberNode,
  [NodeTypes.Boolean]: BooleanNode,
  [NodeTypes.Object]: ObjectNode,
  [NodeTypes.Array]: ArrayNode,
  [NodeTypes.Function]: FunctionNode,
  [NodeTypes.RegExp]: RegExpNode,
  [NodeTypes.Symbol]: SymbolNode,
  [NodeTypes.BigInt]: BigIntNode,
  [NodeTypes.Map]: MapNode,
  [NodeTypes.Set]: SetNode,
  [NodeTypes.WeakMap]: WeakMapNode,
  [NodeTypes.WeakSet]: WeakSetNode
});

export function getJSValueParser(type: JSValueTypes) {
  return JSParserMapper[type];
}

/** JSValueNode start */
declare global {
  interface NodeSchema {
    [NodeTypes.JSValue]: {
      schema: JSValueSchema;
      value: JSValue;
    };
  }
}

export type JSValueSchema = {
  type: NodeTypes.JSValue;
  schema: JSValueSchemas;
};

export type JSValue =
  | void
  | null
  | string
  | number
  | boolean
  | Record<string | symbol, unknown>
  | Array<unknown>
  | FunctionConstructor
  | RegExp
  | symbol
  | bigint
  | Map<string | symbol, unknown>
  | Set<unknown>
  | WeakMap<object, any>
  | WeakSet<object>;

export class JSValueNode extends AbstractNode<NodeTypes.JSValue> {
  private jsValueNode: JSValueNodes;
  setSchema(schema: JSValueSchema): this {
    const Parser = getJSValueParser(schema.schema.type);
    if (!Parser) return this;
    this.jsValueNode = new Parser();
    return this;
  }
  getSchema(): JSValueSchema {
    return {
      type: NodeTypes.JSValue,
      schema: this.jsValueNode.getSchema()
    };
  }
  getValue(): JSValue {
    return <JSValue>this.jsValueNode.getValue();
  }
  constructor() {
    super(NodeTypes.JSValue);
  }
}
