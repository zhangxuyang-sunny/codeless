// type TypeNormalizedAttrs = {
//   title: string;
//   description: string;
//   prop: string;
//   disabled: boolean;
// };

// export type TypeUseEnum<T extends string | number> = {
//   use: "select" | "radio";
//   enums: Array<{ label: string; value: T }>;
//   default: T;
// };

// export type TypeUseSwitch = {
//   use: "switch";
//   default: boolean;
// };

// export type TypeUseInputString = {
//   use: "input";
//   default: string;
// };

// export type TypeUseInputNumber = {
//   use: "inputNumber";
//   default: number;
// };

// export type TypeUseMulti = {
//   oneOf: TypeMaterialPropOptions[];
// };

// export type TypeReadonly = {
//   readonly: true;
// };

// export type TypePropString = TypeNormalizedAttrs & {
//   type: "string";
// } & (TypeUseEnum<string> | TypeUseInputString);

// export type TypePropNumber = TypeNormalizedAttrs & {
//   type: "number";
// } & (TypeUseEnum<number> | TypeUseInputNumber);

// export type TypePropObject = TypeNormalizedAttrs & {
//   type: "object";
//   default: object;
// };

// export type TypePropBoolean = TypeNormalizedAttrs & {
//   type: "boolean";
// } & TypeUseSwitch;

// export type TypePropMulti = TypeNormalizedAttrs & {
//   type: "multi";
// } & TypeUseMulti;

// export type TypeMaterialPropOptions =
//   | TypePropString
//   | TypePropNumber
//   | TypePropBoolean
//   | TypePropObject
//   | TypePropMulti;


type PropWatchFunc = (
  /**
   * 监听prop的key，同时支持object嵌套key, 嵌套key的写法为链式 如：a.b.c
   */
  propertyKey: string,
  /**
   * 每次出发watch 方法的时候会返回propertyKey最新的值
   */
  value: unknown,

  /**
   * 组件内部抛出的方法
   */
  handlers: {
    /**
     * 设置当前prop 组件的显示隐藏
     */
    setVisible: (flag: boolean) => void

}) => void 

export interface TypeProp  {
  /**
   *  组件需要编辑的字段
   */
  propertyKey: string;

  /**
   * prop的名称
   */
  title: string

  /**
    * 属性的描述
    */
  description?: string;

  /**
   * 使用组件的类型
   */
  use: {
    selector : unknown,
    /**
     *  组件的属性
     */
    props: Record<string, unknown>
  }

  /**
   * 监听的属性
   */
  watch?: PropWatchFunc
}


interface TypePropsObject extends Omit<TypeProp, 'use'> { 
  use: "object"
  properties: TypePropsSetter[],
}

export type TypePropsSetter = TypeProp | TypePropsObject
