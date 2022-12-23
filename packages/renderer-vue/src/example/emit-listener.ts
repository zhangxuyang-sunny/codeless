import {
  Application,
  Component,
  SchemaBuilder,
  CallExpressionBuilder,
  StringExpressionBuilder
} from "packages/schema/src/index";

const button_loading_1: Component = SchemaBuilder.Component.set("id", "button_loading_1")
  .set("src", `components/test/ButtonLoading.js`)
  .set("props", {
    name: {
      type: "StringExpression",
      value: "点击触发 button_loading_2:toggle_loading 事件"
    },
    type: {
      type: "StringExpression",
      value: "primary"
    }
  })
  .set("events", [
    {
      name: "click",
      target: [
        {
          event: "button_loading_2:toggle_loading",
          params: null
        },
        {
          event: "button_loading_3:toggle_loading",
          params: null
        }
      ],
      invoke: null
    }
  ])
  .end();

const button_loading_2: Component = SchemaBuilder.Component.set("id", "button_loading_2")
  .set("src", `components/test/ButtonLoading.js`)
  .set("props", {
    name: {
      type: "StringExpression",
      value: "点击给组件 button_loading_1 发送 toggle_loading 事件"
    }
  })
  .addEvent({
    name: "click",
    target: [
      {
        event: "button_loading_1:toggle_loading",
        params: {
          type: "ArrayExpression",
          expressions: [
            {
              type: "CallCloudFunctionExpression",
              target: "console",
              arguments: {
                type: "ArrayExpression",
                expressions: [
                  {
                    type: "StringExpression",
                    value: "log"
                  },
                  {
                    type: "StringExpression",
                    value: "第n个参数"
                  },
                  {
                    type: "CallCloudFunctionExpression",
                    target: "get-current-arguments",
                    arguments: {
                      type: "ArrayExpression",
                      expressions: []
                    },
                    bind: {
                      type: "UndefinedExpression"
                    }
                  }
                ]
              },
              bind: {
                type: "UndefinedExpression"
              }
            },

            {
              type: "CallCloudFunctionExpression",
              target: "get-current-arguments",
              arguments: {
                type: "ArrayExpression",
                expressions: []
              },
              bind: {
                type: "UndefinedExpression"
              }
            }
          ]
        }
      }
    ],
    invoke: null
  })
  .end();

const button_loading_3: Component = SchemaBuilder.Component.set("id", "button_loading_3")
  .set("src", `components/test/ButtonLoading.js`)
  .set("props", {
    name: {
      type: "StringExpression",
      value: "按钮3"
    }
  })
  .end();

const container: Component = SchemaBuilder.Component.set("id", "container")
  .set("src", `components/common/EmptyContainer.js`)
  .set("slots", {
    default: [button_loading_1, button_loading_2, button_loading_3]
  })
  .end();

const emitListenerSchema: Application = SchemaBuilder.Application.set("router", {
  base: "/",
  mode: "history",
  meta: {}
})
  .addPage({
    path: "/",
    component: container
  })
  .setCloudFunction("console", "http://127.0.0.1:7890/static/cloud-function/console.js")
  .setCloudFunction(
    "get-current-this",
    "http://127.0.0.1:7890/static/cloud-function/get-current-this.js"
  )
  .setCloudFunction(
    "get-current-arguments",
    "http://127.0.0.1:7890/static/cloud-function/get-current-arguments.js"
  )
  // 全局监听【按钮1】的 toggle_loading 事件，去触发【按钮3】的 toggle_loading 事件
  .addListener({
    event: "button_loading_1:toggle_loading",
    target: [
      {
        event: "button_loading_3:toggle_loading",
        params: {
          type: "ArrayExpression",
          expressions: [
            new CallExpressionBuilder()
              .setTarget("console")
              .appendArgument(new StringExpressionBuilder().setValue("log").end())
              .appendArgument(new StringExpressionBuilder().setValue("this").end())
              .appendArgument(new CallExpressionBuilder().setTarget("get-current-this").end())
              .end(),
            new CallExpressionBuilder()
              .setTarget("console")
              .appendArgument(new StringExpressionBuilder().setValue("log").end())
              .appendArgument(
                new StringExpressionBuilder()
                  .setValue("button_loading_3 监听到 button_loading_1:toggle_loading")
                  .end()
              )
              .appendArgument(new CallExpressionBuilder().setTarget("get-current-arguments").end())
              .end()
          ]
        }
      }
    ],
    invoke: null,
    once: false
  })
  .end();

export { emitListenerSchema };

console.log({ emitListenerSchema });
