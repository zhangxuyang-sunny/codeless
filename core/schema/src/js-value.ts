/**
 * JS表达式&方法定义
 * JS表达式可以表达所有的JS数据类型，也可以绑定变量
 * 低代码平台在解析表达式的时候，会注入统一的作用域变量、API等，例如 dataset
 */

/**
 * JS表达式描述
 */
export interface JSExpression {
  type: "JSExpression";
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
   * 是否是动态绑定的变量
   */
  reactive: boolean;
}

/**
 * JS方法描述
 */
export interface JSFunction {
  type: "JSFunction";
  /**
   * 函数的字符串
   */
  value: string;
  /**
   * 是否是严格模式
   */
  useStrict: boolean;
}

export function isJSExpression(schema: any): schema is JSExpression {
  return schema.type === "JSExpression" && typeof schema.value === "string";
}

export function isJSFunction(schema: any): schema is JSFunction {
  return schema.type === "JSFunction" && typeof schema.value === "string";
}
