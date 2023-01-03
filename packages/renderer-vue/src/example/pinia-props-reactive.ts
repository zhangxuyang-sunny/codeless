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
                    target: "get-states-by-name",
                    arguments: {
                      type: "ArrayExpression",
                      values: [
                        {
                          type: "StringExpression",
                          value: "state1"
                        }
                      ]
                    },
                    bind: {
                      type: "UndefinedExpression"
                    }
                  },
                  {
                    type: "StringExpression",
                    value: "count"
                  },
                  {
                    type: "CallCloudFunctionExpression",
                    target: "binary-expression",
                    arguments: {
                      type: "ArrayExpression",
                      values: [
                        {
                          type: "CallCloudFunctionExpression",
                          target: "get-state",
                          arguments: {
                            type: "ParallelExpression",
                            values: [
                              {
                                type: "StringExpression",
                                value: "state1"
                              },
                              {
                                type: "StringExpression",
                                value: "count"
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
          name: {
            type: "CallCloudFunctionExpression",
            target: "vue-bind",
            arguments: {
              type: "ArrayExpression",
              values: [
                {
                  type: "StringExpression",
                  value: "state1.count"
                }
              ]
            },
            bind: {
              type: "UndefinedExpression"
            }
          },
          onClick: {
            type: "CallCloudFunctionExpression",
            target: "get-action",
            arguments: {
              type: "ParallelExpression",
              values: [
                {
                  type: "StringExpression",
                  value: "state1"
                },
                {
                  type: "StringExpression",
                  value: "addCount"
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
    "lodash-set": "http://127.0.0.1:7890/static/cloud-function/lodash-set.js",
    "get-state": "http://127.0.0.1:7890/static/cloud-function/get-state.js",
    "get-states-by-name": "http://127.0.0.1:7890/static/cloud-function/get-states-by-name.js",
    "get-action": "http://127.0.0.1:7890/static/cloud-function/get-action.js",
    "string-builder": "http://127.0.0.1:7890/static/cloud-function/string-builder.js",
    "binary-expression": "http://127.0.0.1:7890/static/cloud-function/binary-expression.js",
    "vue-bind": "http://127.0.0.1:7890/static/cloud-function/vue-bind.js"
  },
  expressionPool: {}
};
