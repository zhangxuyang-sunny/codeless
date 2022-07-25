import AbstractNode, { Schema, Value } from "./AbstractNode";
import UnknownNode from "./UnknownNode";
import NullNode from "./NullNode";
import UndefinedNode from "./UndefinedNode";
import NumberNode from "./NumberNode";
import StringNode from "./StringNode";
import ObjectNode from "./ObjectNode";
import ArrayNode from "./ArrayNode";
import BooleanNode from "./BooleanNode";
import FunctionNode from "./FunctionNode";
import RegExpNode from "./RegExpNode";
import SymbolNode from "./SymbolNode";
import BigIntNode from "./BigIntNode";
import MapNode from "./MapNode";
import SetNode from "./SetNode";
import WeakMapNode from "./WeakMapNode";
import WeakSetNode from "./WeakSetNode";
import RouterNode from "./RouterNode";
import PiniaNode from "./PiniaNode";
import PageNode from "./PageNode";
import PageLinkNode from "./PageLinkNode";
import MultiPageNode from "./MultiPageNode";

export const enum SchemaTypes {
  Unknown = "UNKNOWN",
  Null = "NULL",
  Undefined = "UNDEFINED",
  String = "STRING",
  Number = "NUMBER",
  Boolean = "BOOLEAN",
  Object = "OBJECT",
  Array = "ARRAY",
  Function = "FUNCTION",
  RegExp = "REGEXP",
  Symbol = "SYMBOL",
  BigInt = "BIGINT",
  Map = "MAP",
  Set = "SET",
  WeakMap = "WEAK_MAP",
  WeakSet = "WEAK_SET",
  Router = "ROUTER",
  Pinia = "PINIA",
  Page = "PAGE",
  PageLink = "PAGE_LINK",
  MultiPage = "MULTI_PAGE"
}

export const parserMapper: Record<SchemaTypes, () => AbstractNode> = {
  [SchemaTypes.Unknown]: () => new UnknownNode(),
  [SchemaTypes.Null]: () => new NullNode(),
  [SchemaTypes.Undefined]: () => new UndefinedNode(),
  [SchemaTypes.Number]: () => new NumberNode(),
  [SchemaTypes.String]: () => new StringNode(),
  [SchemaTypes.Boolean]: () => new BooleanNode(),
  [SchemaTypes.Array]: () => new ArrayNode(),
  [SchemaTypes.Object]: () => new ObjectNode(),
  [SchemaTypes.Function]: () => new FunctionNode(),
  [SchemaTypes.RegExp]: () => new RegExpNode(),
  [SchemaTypes.Symbol]: () => new SymbolNode(),
  [SchemaTypes.BigInt]: () => new BigIntNode(),
  [SchemaTypes.Map]: () => new MapNode(),
  [SchemaTypes.Set]: () => new SetNode(),
  [SchemaTypes.WeakMap]: () => new WeakMapNode(),
  [SchemaTypes.WeakSet]: () => new WeakSetNode(),
  [SchemaTypes.Router]: () => new RouterNode(),
  [SchemaTypes.Pinia]: () => new PiniaNode(),
  [SchemaTypes.Page]: () => new PageNode(),
  [SchemaTypes.PageLink]: () => new PageLinkNode(),
  [SchemaTypes.MultiPage]: () => new MultiPageNode()
};

export function parseValue(schema: Schema<AbstractNode>): Value<AbstractNode> {
  return parserMapper[schema.type]().setSchema(schema).getValue();
}
