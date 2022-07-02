import { NodeTypes } from "./enums";
import { AbstractNode } from "./AbstractNode";
import {
  UndefinedSchema,
  UndefinedNode,
  UndefinedValue
} from "./UndefinedNode";
import { NullSchema, NullNode, NullValue } from "./NullNode";
import { StringSchema, StringNode, StringValue } from "./StringNode";
import { NumberSchema, NumberNode, NumberValue } from "./NumberNode";
import { BooleanSchema, BooleanNode, BooleanValue } from "./BooleanNode";
import { ObjectSchema, ObjectNode, ObjectValue } from "./ObjectNode";
import { ArraySchema, ArrayNode, ArrayValue } from "./ArrayNode";
import { FunctionSchema, FunctionNode, FunctionValue } from "./FunctionNode";
import { RegExpSchema, RegExpNode, RegExpValue } from "./RegExpNode";
import { SymbolSchema, SymbolNode, SymbolValue } from "./SymbolNode";
import { BigIntSchema, BigIntNode, BigIntValue } from "./BigIntNode";
import { MapSchema, MapNode, MapValue } from "./MapNode";
import { SetSchema, SetNode, SetValue } from "./SetNode";
import { WeakMapSchema, WeakMapNode, WeakMapValue } from "./WeakMapNode";
import { WeakSetSchema, WeakSetNode, WeakSetValue } from "./WeakSetNode";

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
  private jsValueNode: JSValueNodes = new NullNode();
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

AbstractNode.setParser(JSValueNode);
