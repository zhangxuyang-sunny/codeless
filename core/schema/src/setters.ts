/**
 * 设置器协议：描述如何定义设置器的数据结构，支持多种选择或输入的方式
 * 例如下拉单选，单选按钮，输入框等等
 */

// 公共属性
type CommonAttrs = {
  title: string;
  description: string;
  prop: string;
  disabled: boolean;
};

/**
 * 使用枚举的方式选择
 */
export type UseEnum<T extends string | number> = {
  use: "select" | "radio";
  enums: Array<{ label: string; value: T }>;
  default: T;
};

export type UseSwitch = {
  use: "switch";
  default: boolean;
};

export type UseInputString = {
  use: "input";
  default: string;
};

export type UseInputNumber = {
  use: "inputNumber";
  default: number;
};

export type UseMulti = {
  oneOf: TypeMaterialPropOptions[];
};

export type PropReadonly = {
  readonly: true;
};

export type PropString = CommonAttrs & {
  type: "string";
} & (UseEnum<string> | UseInputString);

export type PropNumber = CommonAttrs & {
  type: "number";
} & (UseEnum<number> | UseInputNumber);

export type PropObject = CommonAttrs & {
  type: "object";
  default: object;
};

export type PropBoolean = CommonAttrs & {
  type: "boolean";
} & UseSwitch;

export type PropMulti = CommonAttrs & {
  type: "multi";
} & UseMulti;

export type TypeMaterialPropOptions =
  | PropString
  | PropNumber
  | PropBoolean
  | PropObject
  | PropMulti;
