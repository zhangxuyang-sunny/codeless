import "systemjs";
import "systemjs/dist/extras/use-default.min.js";

import { AbstractSchemaBuilder } from "./AbstractSchemaBuilder";
import { ExpressionRef, FunctionRef } from "./application";

/**
 * @TODO 后面换成枚举
 */
export const enum ExpressionType {
  "NullExpression",
  "UndefinedExpression",
  "StringExpression",
  "NumberExpression",
  "BooleanExpression",
  "ObjectExpression",
  "ArrayExpression",
  "ParallelExpression",
  "SymbolExpression",
  "CallCloudFunctionExpression",
  "CloudFunctionExpression",
  "RuntimeExpression",
  "RefExpression",
  "BindExpression"
}

/**
 * 云函数的 this 指向
 */
export type PlatformThis<P = unknown> = {
  framework: "vue" | "react";
  package: P;
  /**
   * 协议配置的 this
   */
  currentThis: unknown;
  /**
   * 调用方 this
   */
  invokerThis: unknown;
  /**
   * 调用方入参列表
   */
  invokerArguments: unknown[];
  /**¬
   * 状态管理
   */
  stores: {
    states: {
      /**
       * name 为定义 store 的名字
       * eg: store1.count
       */
      [name: string]: Record<string, unknown>;
    };
    actions: {
      [name: string]: Record<string, (...args: unknown[]) => unknown>;
    };
  };
};

export type NullExpression = {
  type: "NullExpression";
};

export function isNullExpression(schema: any): schema is NullExpression {
  try {
    return schema.type === "NullExpression";
  } catch {
    return false;
  }
}

export class NullExpressionBuilder extends AbstractSchemaBuilder<NullExpression> {
  constructor(schema?: NullExpression) {
    super(schema || { type: "NullExpression" });
  }
}

export type UndefinedExpression = {
  type: "UndefinedExpression";
};

export function isUndefinedExpression(schema: any): schema is UndefinedExpression {
  try {
    return schema.type === "UndefinedExpression";
  } catch {
    return false;
  }
}

export class UndefinedExpressionBuilder extends AbstractSchemaBuilder<UndefinedExpression> {
  constructor(schema?: UndefinedExpression) {
    super(schema || { type: "UndefinedExpression" });
  }
}

export type NumberExpression = {
  type: "NumberExpression";
  value: number;
};

export function isNumberExpression(schema: any): schema is NumberExpression {
  try {
    return (
      (schema as NumberExpression).type === "NumberExpression" && //
      "value" in schema
    );
  } catch {
    return false;
  }
}

export type StringExpression = {
  type: "StringExpression";
  value: string;
};

export function isStringExpression(schema: any): schema is StringExpression {
  try {
    return (
      (schema as StringExpression).type === "StringExpression" && //
      "value" in schema
    );
  } catch {
    return false;
  }
}

export class StringExpressionBuilder extends AbstractSchemaBuilder<StringExpression> {
  constructor(schema?: StringExpression) {
    super(schema || { type: "StringExpression", value: "" });
  }
  setValue(value: string) {
    this.set("value", value);
    return this;
  }
}

export type BooleanExpression = {
  type: "BooleanExpression";
  value: boolean;
};

export function isBooleanExpression(schema: any): schema is BooleanExpression {
  try {
    return (
      (schema as BooleanExpression).type === "BooleanExpression" && //
      "value" in schema
    );
  } catch {
    return false;
  }
}

export type ObjectExpression = {
  type: "ObjectExpression";
  value: { [x: string]: Expression };
};

export function isObjectExpression(schema: any): schema is ObjectExpression {
  try {
    return (
      (schema as ObjectExpression).type === "ObjectExpression" && //
      "value" in schema
    );
  } catch {
    return false;
  }
}

export type ArrayExpression = {
  type: "ArrayExpression";
  values: Expression[];
};

export function isArrayExpression(schema: any): schema is ArrayExpression {
  try {
    const s: ArrayExpression = schema;
    return (
      s.type === "ArrayExpression" && //
      Array.isArray(s.values)
    );
  } catch {
    return false;
  }
}
export class ArrayExpressionBuilder extends AbstractSchemaBuilder<ArrayExpression> {
  constructor(schema?: ArrayExpression) {
    super(
      schema || {
        type: "ArrayExpression",
        values: []
      }
    );
  }
  appendValue(value: Expression) {
    this.schema.values.push(value);
    return this;
  }
}
/**
 * 并行执行
 * 数组是有序的，数组一般是串行执行，ParallelExpression 则可以并行执行
 * 在不需要顺序的场景下使用，例如：函数传参
 */
export type ParallelExpression = {
  type: "ParallelExpression";
  values: Expression[];
};
export function isParallelExpression(schema: any): schema is ParallelExpression {
  try {
    const s: ParallelExpression = schema;
    return (
      s.type === "ParallelExpression" && //
      Array.isArray(s.values)
    );
  } catch {
    return false;
  }
}
/**
 * @TODO 更多 JavaScript 数据类型 schema 表达
 * Symbol, BigInt, Map, Set 等等
 */
export type SymbolExpression = {
  type: "SymbolExpression";
  descriptor: string;
};

/**
 * 调用云函数，得到云函数返回值
 */
export type CallCloudFunctionExpression = {
  type: "CallCloudFunctionExpression";
  // 目标云函数 id
  target: string;
  // 参数列表
  arguments: ArrayExpression | ParallelExpression;
  // this 指向
  bind: Expression;
};

export function isCloudFunctionExpression(schema: any): schema is CloudFunctionExpression {
  try {
    return (
      (schema as CloudFunctionExpression).type === "CloudFunctionExpression" &&
      "arguments" in schema &&
      "target" in schema &&
      "bind" in schema
    );
  } catch {
    return false;
  }
}

/**
 * 获取云函数运行时
 */
export type CloudFunctionExpression = {
  type: "CloudFunctionExpression";
  // 目标云函数 id
  target: string;
  // 参数列表
  arguments: ArrayExpression | ParallelExpression;
  // this 指向
  bind: Expression;
};

export function isCallCloudFunctionExpression(schema: any): schema is CallCloudFunctionExpression {
  try {
    const s: CallCloudFunctionExpression = schema;
    return (
      s.type === "CallCloudFunctionExpression" &&
      "arguments" in s &&
      (isArrayExpression(s.arguments) || isParallelExpression(s.arguments)) &&
      typeof s.target === "string" &&
      isExpression(s.bind)
    );
  } catch {
    return false;
  }
}
export class CallExpressionBuilder extends AbstractSchemaBuilder<CallCloudFunctionExpression> {
  constructor(schema?: CallCloudFunctionExpression) {
    super(
      schema || {
        type: "CallCloudFunctionExpression",
        target: "",
        arguments: new ArrayExpressionBuilder().end(),
        bind: {
          type: "UndefinedExpression"
        }
      }
    );
  }
  setTarget(id: string) {
    this.schema.target = id;
    return this;
  }
  setArguments(args: ArrayExpression) {
    this.schema.arguments = args;
    return this;
  }
  appendArgument(arg: Expression) {
    this.schema.arguments.values.push(arg);
    return this;
  }
}

/**
 * 复用表达式
 */
export type RefExpression = {
  type: "RefExpression";
  target: string;
};
export function isRefExpression(schema: any): schema is RefExpression {
  try {
    const s: RefExpression = schema;
    return (
      s.type === "RefExpression" && //
      typeof s.target === "string"
    );
  } catch {
    return false;
  }
}
/**
 * 运行时数据，自定义组件内部传出的数据和低代码协议的桥梁
 */
export type RuntimeExpression = {
  type: "RuntimeExpression";
  value: unknown;
};
export function isRuntimeExpression(schema: any): schema is RuntimeExpression {
  try {
    return (
      (schema as RuntimeExpression).type === "RuntimeExpression" && //
      "value" in schema
    );
  } catch {
    return false;
  }
}

/**
 * 表达式描述集合
 */
export type Expression =
  | NullExpression
  | UndefinedExpression
  | StringExpression
  | NumberExpression
  | BooleanExpression
  | ObjectExpression
  | SymbolExpression
  | ArrayExpression
  | ParallelExpression
  | CallCloudFunctionExpression
  | CloudFunctionExpression
  | RefExpression
  | RuntimeExpression;

export function isExpression(schema: any): schema is Expression {
  return (
    isArrayExpression(schema) ||
    isBooleanExpression(schema) ||
    isCallCloudFunctionExpression(schema) ||
    isCloudFunctionExpression(schema) ||
    isNullExpression(schema) ||
    isNumberExpression(schema) ||
    isObjectExpression(schema) ||
    isRefExpression(schema) ||
    isRuntimeExpression(schema) ||
    isStringExpression(schema) ||
    isUndefinedExpression(schema) ||
    isParallelExpression(schema)
  );
}

/**
 * 解释执行表达式
 * expressionMap/functionMap 来建立 expressionRefs/functionRefs 索引
 */
const expressionMap = new Map<string, ExpressionRef>();
const functionMap = new Map<string, FunctionRef>();
export async function resolveExpression(options: {
  expression: Expression;
  expressionRefs: ExpressionRef[];
  functionRefs: FunctionRef[];
  platformThis: PlatformThis;
}): Promise<unknown | string | number | void | unknown[] | null | Record<string, unknown>> {
  const {
    expression, //
    expressionRefs,
    functionRefs,
    platformThis
  } = options;
  const isCallExp = isCallCloudFunctionExpression(expression);
  if (isCallExp || isCloudFunctionExpression(expression)) {
    if (!functionMap.has(expression.target)) {
      const funcRef = functionRefs.find(o => o.key === expression.target);
      funcRef && functionMap.set(expression.target, funcRef);
    }
    const funcRef = functionMap.get(expression.target);
    if (!funcRef?.src) {
      throw new Error(`[${resolveExpression.name}]: ${expression.target} is not in functions.`);
    }
    const [func, args, invokerThis] = await Promise.all([
      /**
       * 加载云函数
       */
      System.import(funcRef.src),
      /**
       * 处理当前函数的参数
       * 当前函数的参数的调用 this，绑定当前函数的 this
       */
      resolveExpression({
        ...options,
        expression: expression.arguments
      }),
      /**
       * 处理当前函数的 bind
       * 当前函数的 currentThis，绑定当前函数的 this
       */
      resolveExpression({
        ...options,
        expression: expression.bind
      })
    ]);
    return isCallExp //
      ? await func.default.apply(
          {
            ...platformThis,
            invokerThis: platformThis // 平台作为调用方
          },
          args
        )
      : async function (this: unknown, ...invokerArguments: unknown[]) {
          return await func.default.apply(
            { ...platformThis, invokerThis: this, invokerArguments },
            args
          );
        };
  }
  if (
    isNumberExpression(expression) ||
    isStringExpression(expression) ||
    isBooleanExpression(expression) ||
    isRuntimeExpression(expression)
  ) {
    return expression.value;
  }
  if (isNullExpression(expression)) {
    return null;
  }
  if (isUndefinedExpression(expression)) {
    return void 0;
  }
  if (isArrayExpression(expression)) {
    const result: unknown[] = [];
    for (const exp of expression.values) {
      result.push(
        await resolveExpression({
          ...options,
          expression: exp
        })
      );
    }
    return result;
  }
  /**
   * 并行执行，但保证结果是原始顺序
   */
  if (isParallelExpression(expression)) {
    const result: unknown[] = [];
    const pList = expression.values.map(async (exp, index) => {
      const r = await resolveExpression({
        ...options,
        expression: exp
      });
      result[index] = r;
    });
    await Promise.all(pList);
    return result;
  }
  if (isObjectExpression(expression)) {
    const result: { [x: string]: unknown } = {};
    const asyncPool: Promise<unknown>[] = [];
    for (const key in expression.value) {
      const item = expression.value[key];
      asyncPool.push(
        resolveExpression({
          ...options,
          expression: item
        }).then(r => {
          result[key] = r;
        })
      );
    }
    await Promise.all(asyncPool);
    return result;
  }
  if (isRefExpression(expression)) {
    if (!expressionMap.has(expression.target)) {
      const expRef = expressionRefs.find(o => o.key === expression.target);
      expRef && expressionMap.set(expression.target, expRef);
    }
    const expRef = expressionMap.get(expression.target);
    if (!expRef?.expression) {
      throw new Error(`[${resolveExpression.name}]: ${expression.target} is not in expressions.`);
    }
    return resolveExpression({
      ...options,
      expression: expRef.expression
    });
  }
  return void 0;
}
