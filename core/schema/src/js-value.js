/**
 * JS表达式&方法定义
 * JS表达式可以表达所有的JS数据类型，也可以绑定变量
 * 低代码平台在解析表达式的时候，会注入统一的作用域变量、API等，例如 dataset
 */
export function isJSExpression(schema) {
    return schema.type === "JSExpression" && typeof schema.value === "string";
}
export function isJSFunction(schema) {
    return schema.type === "JSFunction" && typeof schema.value === "string";
}
