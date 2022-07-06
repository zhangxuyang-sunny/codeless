type TypeNormalizedAttrs = {
  title: string;
  description: string;
  prop: string;
  disabled: boolean;
};

export type TypeUseEnum<T extends string | number> = {
  use: "select" | "radio";
  enums: Array<{ label: string; value: T }>;
  default: T;
};

export type TypeUseSwitch = {
  use: "switch";
  default: boolean;
};

export type TypeUseInputString = {
  use: "input";
  default: string;
};

export type TypeUseInputNumber = {
  use: "inputNumber";
  default: number;
};

export type TypeUseMulti = {
  oneOf: TypeMaterialPropOption[];
};

export type TypeReadonly = {
  readonly: true;
};

export type TypePropString = TypeNormalizedAttrs & {
  type: "string";
} & (TypeUseEnum<string> | TypeUseInputString);

export type TypePropNumber = TypeNormalizedAttrs & {
  type: "number";
} & (TypeUseEnum<number> | TypeUseInputNumber);

export type TypePropObject = TypeNormalizedAttrs & {
  type: "object";
  default: object;
};

export type TypePropBoolean = TypeNormalizedAttrs & {
  type: "boolean";
} & TypeUseSwitch;

export type TypePropMulti = TypeNormalizedAttrs & {
  type: "multi";
} & TypeUseMulti;

export type TypeMaterialPropOption =
  | TypePropString
  | TypePropNumber
  | TypePropBoolean
  | TypePropObject
  | TypePropMulti;
