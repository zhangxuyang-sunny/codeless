import {
  Dataset,
  isJSExpression,
  isJSFunction,
  JSExpression,
  JSFunction
} from "packages/schema";
import { CreateSliceOptions } from "@reduxjs/toolkit";
import { context, IContext } from "./Context";

/**
 * 解析 JS 表达式类型
 * @param schema JSExpression 协议
 * @param context 上下文数据
 */
export function parseJSExpression(schema: JSExpression, context: IContext) {
  return new Function("context", `return ${schema.value}`)(context);
}

/**
 * 解析 JS 方法定义
 * @param schema JSFunction 协议
 * @param context 上下文数据
 */
export function parseJSFunction(schema: JSFunction, context: IContext) {
  return new Function(
    "context",
    schema.useStrict //
      ? `useStrict;\nreturn ${schema.value}`
      : `return ${schema.value}`
  )(context);
}

interface DatasetRuntime extends Omit<Dataset, "define"> {
  define: CreateSliceOptions;
}

// 解析数据集
export function parseDataset(schema: Dataset): DatasetRuntime {
  return {
    ...schema,
    define: isJSExpression(schema.define)
      ? parseJSExpression(schema.define, context)
      : isJSFunction(schema.define)
      ? parseJSFunction(schema.define, context)
      : {}
  };
}

export function parseDatasetV2(dataset: Dataset) {
  //
}
