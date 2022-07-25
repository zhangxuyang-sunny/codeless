/* eslint-disable @typescript-eslint/no-namespace */
import type { ComputedRef, DefineComponent } from "vue";
import type { Router } from "vue-router";
import type {
  TypePageSchema,
  TypePiniaConfig,
  TypePiniaSchema,
  TypePiniaStore,
  TypeRouterSchema
} from "./project";

// eslint-disable-next-line @typescript-eslint/ban-types
type TypeDefineComponent = DefineComponent<{}, {}, {}, {}, {}>;

// 数据描述
// 所有的运行时数据都是通过描述的方式定义，以便于存储
// 通过 ValueParser 类实例化
export namespace NSValueSchema {
  // 基础类型
  export type TypeNumber<T extends number = number> = {
    type: "Number";
    initial: T;
    $$?: T;
  };
  export type TypeString<T extends string = string> = {
    type: "String";
    initial: T;
    $$?: T;
  };
  export type TypeBoolean<T extends boolean = boolean> = {
    type: "Boolean";
    initial: T;
    $$?: T;
  };
  export type TypeRegExp = {
    type: "RegExp";
    pattern: Parameters<typeof RegExp>[0];
    flag: Parameters<typeof RegExp>[1] | undefined;
    $$?: RegExp;
  };
  export type TypeSymbol = {
    type: "Symbol";
    description: Parameters<typeof Symbol>[0];
    $$?: symbol;
  };
  export type TypeBigInt = {
    type: "BigInt";
    value: Parameters<typeof BigInt>[0];
    $$?: bigint;
  };
  /**
   * @TODO 为什么用 type 会导致循环引用自身
   */
  export interface IArray<T = TypeValueSchema, V = unknown> {
    type: "Array";
    elements: T[];
    $$?: V[];
  }
  export interface IObject<
    P extends { [x: PropertyKey]: unknown } = { [x: PropertyKey]: TypeValueSchema },
    T = { [x: PropertyKey]: unknown }
  > {
    type: "Object";
    properties: P;
    $$?: T;
  }
  export type TypeFunction = {
    type: "Function";
    code: string;
    $$?: FunctionConstructor;
  };
  export type TypeMap = {
    type: "Map";
    iterable: [PropertyKey, TypeValueSchema][];
    $$?: Map<PropertyKey, unknown>;
  };
  export type TypeSet = {
    type: "Set";
    elements: TypeValueSchema[];
    $$?: Set<unknown>;
  };
  export type TypeWeakMap = {
    type: "WeakMap";
    $$?: WeakMap<object, unknown>;
  };
  export type TypeWeakSet = {
    type: "WeakSet";
    $$?: WeakSet<object>;
  };
  type TypePromiseResolve = {
    type: "Promise";
    method: "resolve";
    value: TypeValueSchema;
    $$?: ReturnType<PromiseConstructor["resolve"]>;
  };
  type TypePromiseReject = {
    type: "Promise";
    method: "reject";
    value: TypeValueSchema;
    $$?: ReturnType<PromiseConstructor["reject"]>;
  };
  type TypePromiseRace = {
    type: "Promise";
    method: "race";
    values: (TypePromiseResolve | TypePromiseReject)[];
    $$?: ReturnType<PromiseConstructor["race"]>;
  };
  type TypePromiseAll = {
    type: "Promise";
    method: "all";
    values: (TypePromiseResolve | TypePromiseReject)[];
    $$?: ReturnType<PromiseConstructor["all"]>;
  };
  export type TypePromise =
    | TypePromiseResolve
    | TypePromiseReject
    | TypePromiseRace
    | TypePromiseAll;
  export type TypeNull = {
    type: "Null";
    $$?: null;
  };
  export type TypeUndefined = {
    type: "Undefined";
    $$?: undefined;
  };
  export type TypeUnknown = {
    type: "Unknown";
    schema: TypeValueSchema;
    $$?: string;
  };

  // 高级类型
  export type TypeRouter = {
    type: "Router";
    schema: TypeRouterSchema;
    $$?: Router | null;
  };
  export type TypeReactiveByPinia = {
    type: "ReactiveByPinia";
    path: string;
    $$?: ComputedRef | null;
  };
  export type TypePinia = {
    type: "Pinia";
    key: string;
    schema: TypePiniaSchema;
    $$?: TypePiniaConfig;
  };
  export type TypePiniaLink = {
    type: "PiniaLink";
    key: string;
    $$?: TypePiniaStore | null;
  };
  export type TypePage = {
    type: "Page";
    id: string;
    title: string;
    schema: TypePageSchema;
    $$?: TypeDefineComponent | null;
  };
  export type TypePageLink = {
    type: "PageLink";
    key: string;
    $$?: TypeDefineComponent | null;
  };
}

// 数据定义集合
export type TypeValueSchema =
  | NSValueSchema.TypeNumber
  | NSValueSchema.TypeString
  | NSValueSchema.TypeBoolean
  | NSValueSchema.TypeRegExp
  | NSValueSchema.TypeSymbol
  | NSValueSchema.TypeBigInt
  | NSValueSchema.IArray
  | NSValueSchema.IObject
  | NSValueSchema.TypeFunction
  | NSValueSchema.TypeSet
  | NSValueSchema.TypeMap
  | NSValueSchema.TypeWeakMap
  | NSValueSchema.TypeWeakSet
  | NSValueSchema.TypePromise
  | NSValueSchema.TypeNull
  | NSValueSchema.TypeUndefined
  | NSValueSchema.TypeUnknown
  | NSValueSchema.TypeReactiveByPinia
  | NSValueSchema.TypeRouter
  | NSValueSchema.TypePinia
  | NSValueSchema.TypePiniaLink
  | NSValueSchema.TypePage
  | NSValueSchema.TypePageLink;
