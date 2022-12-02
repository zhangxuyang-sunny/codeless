import {
  type Expression,
  type CloudFunctionPool,
  isArrayExpression,
  isBooleanExpression,
  isCallExpression,
  isFunctionExpression,
  isNullExpression,
  isNumberExpression,
  isObjectExpression,
  isStringExpression,
  isUndefinedExpression,
  PlatformThis
} from "@codeless/schema";

const staticRoot = "//127.0.0.1:7890/static/";

const callPool: CloudFunctionPool = {
  sleep: {
    id: "sleep",
    src: "cloud-function/sleep.js"
  },
  console: {
    id: "console",
    src: "cloud-function/console.js"
  },
  if: {
    id: "if",
    src: "cloud-function/ifelse.js"
  },
  returnArgs: {
    id: "returnArgs",
    src: "cloud-function/return-args.js"
  },
  getLastResult: {
    id: "returnArgs",
    src: "cloud-function/get-last-result.js"
  }
};

const ifElseTest: Expression[] = [
  {
    type: "call",
    target: "if",
    arguments: [
      {
        type: "boolean",
        value: false
      },
      {
        type: "array",
        value: [
          {
            type: "function",
            target: "console",
            arguments: [
              { type: "string", value: "log" },
              { type: "string", value: "打印 true" }
            ]
          }
        ]
      },
      {
        type: "array",
        value: [
          {
            type: "function",
            target: "console",
            arguments: [
              { type: "string", value: "log" },
              { type: "string", value: "间隔 1 秒后打印 false" }
            ]
          },
          {
            type: "function",
            target: "sleep",
            arguments: [{ type: "number", value: 1000 }]
          },
          {
            type: "function",
            target: "console",
            arguments: [
              { type: "string", value: "log" },
              { type: "string", value: "打印 false" }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "null"
  },
  {
    type: "number",
    value: 123
  },
  {
    type: "object",
    value: {
      a: {
        type: "number",
        value: 111
      }
    }
  }
];

const prevProcessTest: Expression[] = [
  {
    type: "call",
    target: "returnArgs",
    arguments: [
      { type: "number", value: 0 },
      { type: "object", value: { a: { type: "string", value: "a" } } }
    ]
  },
  {
    type: "call",
    target: "console",
    arguments: [
      { type: "string", value: "log" },
      { type: "call", target: "getLastResult", arguments: [] }
    ]
  }
];

async function invokeExpression(
  expression: Expression,
  pool: CloudFunctionPool,
  bind: PlatformThis
) {
  const isCallExp = isCallExpression(expression);
  if (isCallExp || isFunctionExpression(expression)) {
    const src = pool[expression.target]?.src;
    if (!src) {
      return void 0;
    }
    const func = await System.import(staticRoot + src);
    /**
     * 处理当前函数的参数
     * 当前函数的参数的调用 this，绑定当前函数的 this
     */
    const args = await run(expression.arguments, pool, bind);

    return isCallExp //
      ? await func.default.apply(bind, args)
      : async () => await func.default.apply(bind, args);
  }
  if (isObjectExpression(expression)) {
    const obj: Record<string, unknown> = {};
    for (const key in expression.value) {
      const item = expression.value[key];
      obj[key] = await invokeExpression(item, pool, bind);
    }
    return obj;
  }
  if (isArrayExpression(expression)) {
    return await run(expression.value, pool, bind);
  }
  if (isNullExpression(expression)) {
    return null;
  }
  if (isUndefinedExpression(expression)) {
    return void 0;
  }
  if (
    isStringExpression(expression) ||
    isNumberExpression(expression) ||
    isBooleanExpression(expression)
  ) {
    return expression.value;
  }
  return void 0;
}

async function run(
  list: Expression[],
  pool: CloudFunctionPool,
  bind: PlatformThis
): Promise<unknown[]> {
  const result: unknown[] = [];
  let lastResult: unknown = void 0;
  for (const item of list) {
    lastResult = await invokeExpression(item, pool, {
      ...bind,
      lastResult
    });
    result.push(lastResult);
  }
  return result;
}

export function start() {
  run(prevProcessTest, callPool, {
    current: null,
    lastResult: null,
    resultPool: {},
    context: {}
  }).then(data => {
    console.log(data);
  });
}
