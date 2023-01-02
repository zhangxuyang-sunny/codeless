import type { Application } from "@codeless/schema";

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
              type: "StringExpression",
              value: "1"
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
                values: [
                  {
                    type: "CallCloudFunctionExpression",
                    target: "get-store",
                    arguments: {
                      type: "ArrayExpression",
                      values: []
                    },
                    bind: {
                      type: "UndefinedExpression"
                    }
                  },
                  {
                    type: "StringExpression",
                    value: "state1.store.count"
                  },
                  {
                    type: "CallCloudFunctionExpression",
                    target: "binary-expression",
                    arguments: {
                      type: "ArrayExpression",
                      values: [
                        {
                          type: "CallCloudFunctionExpression",
                          target: "get-state-by-path",
                          arguments: {
                            type: "ParallelExpression",
                            values: [
                              {
                                type: "StringExpression",
                                value: "state1.store.count"
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
                          type: "StringExpression",
                          value: "2"
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
          // name: {
          //   type: "BindExpression",
          //   path: "state1.store.count"
          // },
          name: {
            type: "CallCloudFunctionExpression",
            target: "vue-bind",
            arguments: {
              type: "ArrayExpression",
              values: [
                {
                  type: "StringExpression",
                  value: "state1.store.count"
                }
              ]
            },
            bind: {
              type: "UndefinedExpression"
            }
          },
          onClick: {
            type: "CallCloudFunctionExpression",
            target: "get-state-by-path",
            arguments: {
              type: "ParallelExpression",
              values: [
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
    "binary-expression": "http://127.0.0.1:7890/static/cloud-function/binary-expression.js",
    "vue-bind": "http://127.0.0.1:7890/static/cloud-function/vue-bind.js"
  },
  expressionPool: {}
};
