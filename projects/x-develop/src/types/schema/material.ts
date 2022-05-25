import type { VNodeProps } from 'vue';

export type TypeMaterialEvent = `${string}:${string}` | string;
export type TypeMaterialStyle = Partial<CSSStyleDeclaration>;
export type TypeMaterialProps = VNodeProps & {
  [x: string]: any;
};
export type TypeMaterialCommonProps = {
  if?: unknown;
  show?: unknown;
  hidden?: unknown;
};
export type TypeMaterialTarget =
  | [TypeMaterialEvent, (...args: any[]) => any]
  | [TypeMaterialEvent];
export type TypeMaterialEmit = {
  event: TypeMaterialEvent;
  target?: TypeMaterialTarget[];
  invoke?: (...args: any[]) => unknown;
};
export type TypeMaterialListener = {
  event: TypeMaterialEvent;
  origin: string;
};

// 物料协议
export type TypeMaterialSchema = {
  id: string;
  name: string;
  version: string;
  src: string;
  style: TypeMaterialStyle;
  props: TypeMaterialProps;
  commonProps: TypeMaterialCommonProps;
  emits: TypeMaterialEmit[];
  listeners: TypeMaterialListener[];
  slots: Partial<{
    default: TypeMaterialSchema[];
    [x: string]: TypeMaterialSchema[];
  }>;
};
