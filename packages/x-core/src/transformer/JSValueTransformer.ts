import { AbstractNode } from "../nodes";
import { NodeTypes } from "../enums";
import {
  UndefinedSchema,
  UndefinedNode,
  UndefinedValue
} from "../nodes/UndefinedNode";
import { NullSchema, NullNode, NullValue } from "../nodes/NullNode";
import { StringSchema, StringNode, StringValue } from "../nodes/StringNode";
import { NumberSchema, NumberNode, NumberValue } from "../nodes/NumberNode";
import { BooleanSchema, BooleanNode, BooleanValue } from "../nodes/BooleanNode";
import { ObjectSchema, ObjectNode, ObjectValue } from "../nodes/ObjectNode";
import { ArraySchema, ArrayNode, ArrayValue } from "../nodes/ArrayNode";
import {
  FunctionSchema,
  FunctionNode,
  FunctionValue
} from "../nodes/FunctionNode";
import { RegExpSchema, RegExpNode, RegExpValue } from "../nodes/RegExpNode";
import { SymbolSchema, SymbolNode, SymbolValue } from "../nodes/SymbolNode";
import { BigIntSchema, BigIntNode, BigIntValue } from "../nodes/BigIntNode";
import { MapSchema, MapNode, MapValue } from "../nodes/MapNode";
import { SetSchema, SetNode, SetValue } from "../nodes/SetNode";
import { WeakMapSchema, WeakMapNode, WeakMapValue } from "../nodes/WeakMapNode";
import { WeakSetSchema, WeakSetNode, WeakSetValue } from "../nodes/WeakSetNode";

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

export type JSValueValues =
  | UndefinedValue
  | NullValue
  | StringValue
  | NumberValue
  | BooleanValue
  | ObjectValue
  | ArrayValue
  | FunctionValue
  | RegExpValue
  | SymbolValue
  | BigIntValue
  | MapValue
  | SetValue
  | WeakMapValue
  | WeakSetValue;

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

export class JSValueTransformer<T extends NodeTypes> {
  constructor(schema: NodeSchemas<T>) {
    this.setSchema(schema);
  }
  private jsValueNode: AbstractNode = new NullNode();
  setSchema(schema: NodeSchemas<T>): this {
    const Parser = getJSValueParser(schema.type);
    if (Parser) {
      this.jsValueNode = new Parser();
    }
    return this;
  }
  getSchema() {
    return this.jsValueNode.getSchema();
  }
  getValue() {
    return this.jsValueNode.getValue();
  }
}
