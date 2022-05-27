/* eslint-disable @typescript-eslint/no-namespace */
import type { ComputedRef, DefineComponent } from "vue";
import type { TypeMaterialConfig } from "./material";
import type { TypePageConfig, TypePiniaConfig, TypePiniaStore, TypeRouterConfig } from "./config";

// eslint-disable-next-line @typescript-eslint/ban-types
type TypeDefineComponent = DefineComponent<{}, {}, {}, {}, {}>;

// 数据描述
// 所有的运行时数据都是通过描述的方式定义，以便于存储
// 通过 ValueParser 类实例化
// 基础类型
export type TypeNumber<T extends number = number> = {
  type: "Number";
  initial: T;
  // $$?: T;
};
export class ValueNumber extends Value<TypeNumber, number> {
  constructor(initial = 0) {
    super("Number");
    this.$schema.initial = initial;
  }
  setValue(val: number) {
    this.$schema.initial = val;
    return this;
  }
  get value() {
    return this.schema.initial;
  }
}

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
// TODO：为什么用 type 会导致循环引用自身
export interface IArray<T = TypeValueSchema, V = unknown> {
  type: "Array";
  elements: T[];
  $$?: V[];
}
export interface IObject<
  P extends { [x: PropertyKey]: unknown } = { [x: PropertyKey]: TypeValueSchema }
  // T = { [x: PropertyKey]: unknown }
> {
  type: "Object";
  properties: P;
  // $$?: T;
}
export class ValueObject extends Value<IObject, { [k: string]: TypeAll["value"] }> {
  constructor(schema?: IObject) {
    super("Object");
    if (schema) {
      this.$schema = schema;
    } else {
      this.$schema.properties = {};
    }
  }
  setProperty(key: string, value: TypeValueSchema) {
    if (!this.$schema.properties) {
      this.$schema.properties = {};
    }
    this.$schema.properties[key] = value;
    return this;
  }
  setProperties(properties: IObject["properties"]) {
    this.$schema.properties = properties;
    return this;
  }
  get value() {
    const { properties } = this.schema;
    const obj = Object.entries(properties) //
      .reduce<Record<string, TypeAll["value"]>>((prev, [key, property]) => {
        const config = this.parseValue(property);
        prev[key] = config;
        return prev;
      }, {});
    return obj;
  }
}

type TypeAll = ValueObject | ValueNumber;
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
export type TypePromise = TypePromiseResolve | TypePromiseReject | TypePromiseRace | TypePromiseAll;
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
  mode: TypeString<"hash" | "history">;
  routes: Array<{
    name: TypeString;
    path: TypeString;
    page: TypePage | TypePageLink;
  }>;
  $$?: TypeRouterConfig | null;
};
export type TypeReactiveByPinia = {
  type: "ReactiveByPinia";
  path: string;
  $$?: ComputedRef | null;
};
export type TypePinia = {
  type: "Pinia";
  key: TypeString;
  state: IObject<Record<string, TypeValueSchema>>;
  getters: IObject<Record<string, TypeFunction>>;
  actions: IObject<Record<string, TypeFunction>>;
  $$?: TypePiniaConfig;
};
export type TypePiniaLink = {
  type: "PiniaLink";
  key: TypeString;
  $$?: TypePiniaStore | null;
};
export type TypePage = {
  type: "Page";
  id: TypeString;
  title: TypeString;
  version: TypeString;
  src: TypeString;
  style: TypeValueSchema;
  props: TypeValueSchema;
  commonProps: TypeValueSchema;
  emits: IArray;
  listeners: IArray;
  slots: IObject<{
    default: IArray<TypePage, TypeMaterialConfig>;
    [x: string]: IArray<TypePage, TypeMaterialConfig>;
  }>;
  $$?: TypePageConfig | null;
};
export type TypePageLink = {
  type: "PageLink";
  key: TypeString;
  $$?: TypePageConfig | null;
};

// 多页面描述
export type TypeMultiPage = {
  type: "MultiPage";
  router: TypeRouter;
  piniaList: TypePinia[];
  pageList: TypePage[];
  $$?: {
    router: TypeRouterConfig;
    piniaList: TypePiniaConfig[];
    pageList: TypePage["$$"][];
  };
};
// 数据定义集合
export type TypeValueSchema =
  | TypeNumber
  | TypeString
  | TypeBoolean
  | TypeRegExp
  | TypeSymbol
  | TypeBigInt
  | IArray
  | IObject
  | TypeFunction
  | TypeSet
  | TypeMap
  | TypeWeakMap
  | TypeWeakSet
  | TypePromise
  | TypeNull
  | TypeUndefined
  | TypeUnknown
  | TypeReactiveByPinia
  | TypeRouter
  | TypePinia
  | TypePiniaLink
  | TypePage
  | TypePageLink
  | TypeMultiPage;
