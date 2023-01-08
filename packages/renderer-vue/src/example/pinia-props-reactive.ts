import type { Application } from "@codeless/schema";

export const piniaPropsReactive: Application = {
  version: "0",
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
              type: "RefExpression",
              target: "addCountExpression"
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
      meta: {
        title: "未命名页面"
      },
      path: "/",
      component: {
        id: "ButtonLoading",
        src: "/components/common/EmptyContainer.js",
        props: {},
        style: null,
        className: null,
        css: null,
        slots: {
          default: new Array(10).fill({
            id: "ButtonLoading",
            src: "/components/test/ButtonLoading.js",
            props: {
              name: {
                type: "CallCloudFunctionExpression",
                target: "vue-bind",
                arguments: {
                  type: "ArrayExpression",
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
          })
        },
        events: []
      }
    }
  ],
  listeners: [],
  eventsOptions: {
    maxListeners: Infinity
  },
  functions: [
    {
      key: "lodash-set",
      src: `/cloud-function/lodash-set.js`
    },
    {
      key: "get-state",
      src: `/cloud-function/get-state.js`
    },
    {
      key: "get-states-by-name",
      src: `/cloud-function/get-states-by-name.js`
    },
    {
      key: "get-action",
      src: `/cloud-function/get-action.js`
    },
    {
      key: "string-builder",
      src: `/cloud-function/string-builder.js`
    },
    {
      key: "binary-expression",
      src: `/cloud-function/binary-expression.js`
    },
    {
      key: "vue-bind",
      src: `/cloud-function/vue-bind.js`
    }
  ],
  expressions: [
    {
      key: "addCountExpression",
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
};
