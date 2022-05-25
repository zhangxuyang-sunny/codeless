type TypeBoolean = {
  type: 'Boolean';
  value: boolean;
};
type TypeNumber = {
  type: 'Number';
  value: number;
};
type TypeString = {
  type: 'String';
  value: string;
};
// TODO 泛型
export type TypeArray = {
  type: 'Array';
  items: TypeDataSchema[];
};
type TypeMap = {
  type: 'Map';
  entries: [TypeDataSchema, TypeDataSchema][];
};
type TypeSet = {
  type: 'Set';
  items: TypeDataSchema[];
};
type TypeWeakMap = {
  type: 'WeakMap';
};
type TypeWeakSet = {
  type: 'WeakSet';
};
type TypeRegexp = {
  type: 'Regexp';
  value: string;
};
type TypePromise = {
  type: 'Promise';
};
type TypeSymbol = {
  type: 'Symbol';
  description?: string;
};
type TypeBigInt = {
  type: 'BigInt';
  initial: string;
};
type TypeFunction = {
  type: 'Function';
  value: string;
};
type TypeUndefined = {
  type: 'Undefined';
};
type TypeNull = {
  type: 'Null';
};
type TypeUnknown = {
  type: 'Unknown';
  value: any;
};
// TODO 泛型
export type TypeObject = {
  type: 'Object';
  properties: Record<number | string, TypeDataSchema>;
};
type TypeReactive = {
  type: 'Reactive';
  path: string;
};
type TypePage = {
  type: 'Page';
  key: string;
};

// 数据协议
export type TypeDataSchema =
  | TypeUndefined
  | TypeNull
  | TypeNumber
  | TypeString
  | TypeBoolean
  | TypeBigInt
  | TypeObject
  | TypeArray
  | TypeSet
  | TypeMap
  | TypeRegexp
  | TypePromise
  | TypeWeakMap
  | TypeWeakSet
  | TypeSymbol
  | TypeFunction
  | TypeUnknown
  | TypeReactive
  | TypePage;
