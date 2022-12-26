import { Application } from "@codeless/schema";

export const piniaPropsReactive: Application = {
  framework: "vue",
  stores: [
    {
      name: "state1",
      define: {
        state: {
          type: "ObjectExpression",
          value: {
            count: {
              type: "NumberExpression",
              value: 0
            }
          }
        },
        actions: [
          {
            name: "addCount",
            expression: {
              type: "CallCloudFunctionExpression",
              target: "lodash-set",
              arguments: {
                type: "ArrayExpression",
                expressions: [
                  {
                    type: "CallCloudFunctionExpression",
                    target: "get-store",
                    arguments: {
                      type: "ArrayExpression",
                      expressions: []
                    },
                    bind: {
                      type: "UndefinedExpression"
                    }
                  },
                  {
                    type: "StringExpression",
                    value: "state1.state.count"
                  },
                  {
                    type: "CallCloudFunctionExpression",
                    target: "binary-expression",
                    arguments: {
                      type: "ArrayExpression",
                      expressions: [
                        {
                          type: "CallCloudFunctionExpression",
                          target: "get-state-by-path",
                          arguments: {
                            type: "ParallelExpression",
                            expressions: [
                              {
                                type: "StringExpression",
                                value: "state1.state.count"
                              }
                            ]
                          },
                          bind: {
                            type: "UndefinedExpression"
                          }
                        },
                        {
                          type: "StringExpression",
                          value: "+"
                        },
                        {
                          type: "NumberExpression",
                          value: 1
                        }
                      ]
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
            }
          }
        ]
      }
    }
  ],
  router: {
    base: "/",
    mode: "hash",
    meta: {}
  },
  pages: [
    {
      path: "/",
      component: {
        id: "ButtonLoading",
        src: "components/test/ButtonLoading.js",
        props: {
          name: {
            type: "BindExpression",
            path: "state1.state.count"
          },
          onClick: {
            type: "CallCloudFunctionExpression",
            target: "get-state-by-path",
            arguments: {
              type: "ParallelExpression",
              expressions: [
                {
                  type: "StringExpression",
                  value: "state1.actions.addCount"
                }
              ]
            },
            bind: {
              type: "UndefinedExpression"
            }
          }
        },
        style: null,
        className: null,
        css: null,
        slots: {},
        events: []
      }
    }
  ],
  listeners: [],
  eventsOptions: {
    maxListeners: Infinity
  },
  cloudFunctionPool: {
    "get-state-by-path": "http://127.0.0.1:7890/static/cloud-function/get-state-by-path.js",
    "lodash-set": "http://127.0.0.1:7890/static/cloud-function/lodash-set.js",
    "get-store": "http://127.0.0.1:7890/static/cloud-function/get-store.js",
    "string-builder": "http://127.0.0.1:7890/static/cloud-function/string-builder.js",
    "binary-expression": "http://127.0.0.1:7890/static/cloud-function/binary-expression.js"
  },
  expressionPool: {}
};
