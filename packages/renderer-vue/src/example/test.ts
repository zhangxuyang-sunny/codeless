import { Application, Component, SchemaBuilder } from "packages/schema/src/index";

const button_loading_3: Component = SchemaBuilder.Component.set("id", "button_loading_3")
  .set("src", `components/test/ButtonLoading.js`)
  .set("props", {
    name: {
      type: "StringExpression",
      value: "按钮3"
    }
  })
  .set("events", [
    {
      name: "click",
      target: [
        {
          event: "button_loading_3:loading",
          params: null
        }
      ],
      invoke: null
    }
  ])
  .end();

const test: Application = SchemaBuilder.Application.set("router", {
  base: "/",
  mode: "history",
  meta: {}
})
  .addPage({
    meta: {
      title: "未命名页面"
    },
    path: "/",
    component: button_loading_3
  })
  .addCloudFunction("call-action-by-path", "/static/common/cloud-function/call-action-by-path.js")
  .addCloudFunction("lodash-set", "/static/common/cloud-function/lodash-set.js")
  .addStore({
    name: "test",
    define: {
      state: {
        type: "ObjectExpression",
        value: {
          a: {
            type: "NumberExpression",
            value: 1
          },
          b: {
            type: "NumberExpression",
            value: 100
          }
        }
      },
      actions: [
        {
          name: "setAState",
          expression: {
            type: "ArrayExpression",
            values: [
              {
                type: "CallCloudFunctionExpression",
                target: "lodash-set",
                arguments: {
                  type: "ParallelExpression",
                  values: [
                    {
                      type: "CallCloudFunctionExpression",
                      target: "get-state",
                      arguments: {
                        type: "ParallelExpression",
                        values: []
                      },
                      bind: {
                        type: "UndefinedExpression"
                      }
                    },
                    {
                      type: "StringExpression",
                      value: "a"
                    },
                    {
                      type: "NumberExpression",
                      value: 100
                    }
                  ]
                },
                bind: {
                  type: "UndefinedExpression"
                }
              }
            ]
          }
        }
      ]
    }
  })
  .end();

export { test };

console.log({ test });
