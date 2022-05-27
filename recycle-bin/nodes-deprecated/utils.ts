import type { TypeSchemaCollection } from "./Index";
import { NumberNode } from "./Number";
import { StringNode } from "./String";
import { ObjectNode } from "./Object";
import { FunctionNode } from "./Function";
import { SetNode } from "./Set";
import { BooleanNode } from "./Boolean";
import { RegExpNode } from "./RegExp";
import { SymbolNode } from "./Symbol";
import { BigIntNode } from "./BigInt";
import { ArrayNode } from "./Array";

export function isType(
  data: unknown,
  type: "Object" | "Array" | "Set" | "Map" | "Function" | "WeakMap" | "WeakSet"
) {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

export function isObject(data: unknown): boolean {
  return isType(data, "Object");
}

export function parseValue<S extends TypeSchemaCollection>(schema: S): S["$$"] {
  // 浅拷贝一份，避免函数不纯
  schema = { ...schema };
  switch (schema.type) {
    case "Number": {
      schema.$$ = new NumberNode().setSchema(schema).getValue();
      break;
    }
    case "String": {
      schema.$$ = new StringNode().setSchema(schema).getValue();
      break;
    }
    case "Boolean": {
      schema.$$ = new BooleanNode().setSchema(schema).getValue();
      break;
    }
    case "RegExp": {
      schema.$$ = new RegExpNode().setSchema(schema).getValue();
      break;
    }
    case "Symbol": {
      schema.$$ = new SymbolNode().setSchema(schema).getValue();
      break;
    }
    case "BigInt": {
      schema.$$ = new BigIntNode().setSchema(schema).getValue();
      break;
    }
    case "Array": {
      schema.$$ = new ArrayNode().setSchema(schema).getValue();
      break;
    }
    case "Object": {
      schema.$$ = new ObjectNode().setSchema(schema).getValue();
      break;
    }
    case "Function": {
      schema.$$ = new FunctionNode({ piniaRecord: {} }).setSchema(schema).getValue();
      break;
    }
    // case "Map": {
    //   schema.$$ = new ValueMap(schema.iterable).getValue();
    //   break;
    // }
    case "Set": {
      schema.$$ = new SetNode().setSchema(schema).getValue();
      break;
    }
    // case "WeakMap": {
    //   schema.$$ = new ValueWeakMap().getValue();
    //   break;
    // }
    // case "WeakSet": {
    //   schema.$$ = new ValueWeakSet().getValue();
    //   break;
    // }
    // case "Null": {
    //   schema.$$ = null;
    //   break;
    // }
    // case "Undefined": {
    //   schema.$$ = undefined;
    //   break;
    // }
    // case "Router": {
    //   schema.$$ = new ValueRouter(schema).getValue();
    //   break;
    // }
    // case "Unknown":
    // default: {
    //   schema.$$ = `Unknown Type: ${schema.type}`;
    //   break;
    // }
  }
  return schema.$$;
}
