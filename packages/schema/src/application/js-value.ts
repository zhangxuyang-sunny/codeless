/**
 * JS表达式&方法定义
 * JS表达式可以表达所有的JS数据类型，也可以绑定变量
 * 低代码平台在解析表达式的时候，会注入统一的作用域变量、API等
 */

import { AbstractSchemaBuilder } from "./AbstractSchemaBuilder";

export const enum JSTypes {
  JSFunction = "JSFunction",
  JSExpression = "JSExpression"
}

/**
 * 挂载 window 的 key
 * 用于获取协议定义解析生成的运行时数据
 */
export const CODELESS_SYMBOL_KEY = Symbol("CODELESS_SYMBOL_KEY");
export const CODELESS_TEMP_KEY = Symbol("CODELESS_TEMP_KEY");

export type RuntimeFunction = (this: unknown | void | Window, ...args: any[]) => any;

/**
 * JS表达式静态描述协议
 */
export type JSExpression<isStatic extends boolean = false> = {
  type: JSTypes.JSExpression;
  /**
   * 数字       value: "0"
   * 字符串     value: "'0'"
   * 布尔值     value: "true"
   * null      value: "null",
   * undefined value: "void 0" 或 "undefined"
   * BigInt    value: "BigInt(0)"
   * 数组       value: "[1,2,3,"4",false]"
   * Map       value: "new Map()"
   * Set       value: "new Set()"
   * WeakMap   value: "new WeakMap()"
   * WeakSet   value: "new WeakSet()"
   * 绑定变量   value: "dataset.state.data.loading"
   * 字符串模板 value: "`你好${dataset.state.data.world}`"
   * 自调用函数 value: "(function () { return "hello" })()"
   */
  value: string;
  /**
   * 标记无需响应的静态值
   */
  static: isStatic;
};

/**
 * JS方法静态描述协议
 */
export type JSFunction = {
  type: JSTypes.JSFunction;
  /**
   * 函数的字符串
   */
  value: string;
  /**
   * 是否是严格模式
   */
  useStrict: boolean;
};

/**
 * JSExpression 协议类型保护
 * @TODO 使用 ajv 校验
 * @param schema
 * @returns boolean
 */
export function isJSExpression(schema: any, isRuntime: true): schema is JSExpression<true>;
export function isJSExpression(schema: any, isRuntime: false): schema is JSExpression<false>;
export function isJSExpression(
  schema: any,
  isRuntime: boolean
): schema is JSExpression | JSFunction;
export function isJSExpression(
  schema: any,
  isRuntime = false
): schema is JSExpression | JSFunction {
  if (schema?.type !== JSTypes.JSExpression) {
    return false;
  }
  if (isRuntime) {
    return (
      schema?.runtime && //
      typeof schema?.symbol === "symbol" &&
      typeof schema?.value === "function"
    );
  } else {
    return typeof schema?.value === "string";
  }
}

/**
 * JSExpression 协议类型保护
 * @TODO 使用 ajv 校验
 * @param schema
 * @returns boolean
 */
export function isJSFunction(schema: any, isRuntime: true): schema is JSFunction;
export function isJSFunction(schema: any, isRuntime: false): schema is JSFunction;
export function isJSFunction(schema: any, isRuntime: boolean): schema is JSFunction | JSFunction;
export function isJSFunction(schema: any, isRuntime = false): schema is JSFunction | JSFunction {
  if (schema?.type !== JSTypes.JSFunction) {
    return false;
  }
  if (isRuntime) {
    return schema?.runtime && typeof schema?.symbol === "symbol";
  } else {
    return typeof schema?.value === "string";
  }
}

export function parseJSValue(
  schema:
    | JSExpression //
    | JSFunction
    | unknown,
  name: string
): {
  symbol: symbol;
  value: string;
} {
  name = `(${name})`;
  if (isJSExpression(schema, false)) {
    return {
      symbol: Symbol(`JSExpression${name}`),
      value: `(function () { return ${schema.value} }).bind(window)`
    };
  }
  if (isJSFunction(schema, false)) {
    return {
      symbol: Symbol(`JSFunction${name}`),
      value: `(${schema.value}).bind(window)`
    };
  }
  throw new Error("schema is not a 'JSExpression' or 'JSFunction'");
}

/**
 * 表达式协议构建器
 */
export class JSExpressionSchemaBuilder extends AbstractSchemaBuilder<JSExpression> {
  constructor(schema?: JSExpression) {
    super(
      schema ?? {
        type: JSTypes.JSExpression,
        value: "",
        static: false
      }
    );
  }
  setValue(value: string) {
    this.schema.value = value;
    return this;
  }
}

/**
 * JS方法协议构建器
 */
export class JSFunctionSchemaBuilder extends AbstractSchemaBuilder<JSFunction> {
  constructor(schema?: JSFunction) {
    super(
      schema ?? {
        type: JSTypes.JSFunction,
        value: "",
        useStrict: false
      }
    );
  }
  setValue(value: string) {
    this.schema.value = value;
    return this;
  }
}
