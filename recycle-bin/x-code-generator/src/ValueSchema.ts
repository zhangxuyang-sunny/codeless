import { NSValueSchema, TypeValueSchema } from "../../x-types/schema/value";
import { TypePageSchema, TypePiniaSchema, TypeRouterSchema } from "../../x-types/schema/config";

// class JSONString {
//   type: "String";
//   initial: string;
//   $$?: string;
// }

// class JSONNumber {
//   type: "Number";
//   initial: number;
//   $$?: number;
// }

export default class ValueSchema {
  static String<T extends string>(initial: T): TypeString<T> {
    return { type: "String", initial };
  }

  static Number<T extends number>(initial: T): TypeNumber<T> {
    return { type: "Number", initial };
  }

  static Boolean<T extends boolean>(initial: T): TypeBoolean<T> {
    return { type: "Boolean", initial };
  }

  static RegExp(pattern: TypeRegExp["pattern"], flag: TypeRegExp["flag"]): TypeRegExp {
    return { type: "RegExp", pattern, flag };
  }

  static Symbol(description: TypeSymbol["description"]): TypeSymbol {
    return { type: "Symbol", description };
  }

  static BigInt(initial: Parameters<BigIntConstructor>[0]): TypeBigInt {
    return { type: "BigInt", value: initial };
  }

  static Array<T extends TypeValueSchema>(elements: T[]): IArray<T> {
    return { type: "Array", elements };
  }

  static Object<P extends { [x: PropertyKey]: unknown } = { [x: PropertyKey]: TypeValueSchema }>(
    properties: P
  ): IObject<P> {
    return { type: "Object", properties };
  }

  static Function(code: string): TypeFunction {
    return { type: "Function", code };
  }

  static Map(iterable: [PropertyKey, TypeValueSchema][]): TypeMap {
    return { type: "Map", iterable };
  }

  static Set(elements: TypeValueSchema[]): TypeSet {
    return { type: "Set", elements };
  }

  // TODO
  static WeakMap(): TypeWeakMap {
    return { type: "WeakMap" };
  }

  // TODO
  static WeakSet(): TypeWeakSet {
    return { type: "WeakSet" };
  }

  static Null(): TypeNull {
    return { type: "Null" };
  }

  static Undefined(): TypeUndefined {
    return { type: "Undefined" };
  }

  static Router(schema: TypeRouterSchema): TypeRouter {
    return { type: "Router", schema };
  }

  static ReactiveByPinia(path: string): TypeReactiveByPinia {
    return { type: "ReactiveByPinia", path };
  }

  static Pinia(schema: TypePiniaSchema): TypePinia {
    return { type: "Pinia", schema };
  }

  static Page(schema: TypePageSchema): TypePage {
    return { type: "Page", schema };
  }

  static PageLink(key: string): TypePageLink {
    return { type: "PageLink", key };
  }
}
