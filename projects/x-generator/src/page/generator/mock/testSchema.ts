import { NodeTypes, PageSchema } from "packages/x-nodes";

export const testSchema1: PageSchema = {
  type: NodeTypes.Page,
  urlPath: {
    type: NodeTypes.String,
    value: "/"
  },
  src: {
    type: NodeTypes.String,
    value: "http://127.0.0.1:7890/static/components/arco/Container.js"
  },
  slots: {
    type: NodeTypes.Object,
    properties: {
      default: {
        type: NodeTypes.Array,
        elements: [
          {
            type: NodeTypes.Material,
            title: {
              type: NodeTypes.String,
              value: "按钮"
            },
            key: {
              type: NodeTypes.String,
              value: "key12"
            },
            style: {
              type: NodeTypes.Object,
              properties: {}
            },
            commonProps: {
              type: NodeTypes.Object,
              properties: {}
            },
            emits: {
              type: NodeTypes.Array,
              elements: []
            },
            listeners: {
              type: NodeTypes.Array,
              elements: []
            },
            version: {
              type: NodeTypes.String,
              value: "1.0.0"
            },
            id: {
              type: NodeTypes.String,
              value: "button1"
            },
            slots: {
              type: NodeTypes.Object,
              properties: {
                default: {
                  type: NodeTypes.Array,
                  elements: [
                    {
                      type: NodeTypes.Material,
                      title: {
                        type: NodeTypes.String,
                        value: "Text"
                      },
                      key: {
                        type: NodeTypes.String,
                        value: "key132"
                      },
                      style: {
                        type: NodeTypes.Object,
                        properties: {}
                      },
                      commonProps: {
                        type: NodeTypes.Object,
                        properties: {}
                      },
                      emits: {
                        type: NodeTypes.Array,
                        elements: []
                      },
                      listeners: {
                        type: NodeTypes.Array,
                        elements: []
                      },
                      version: {
                        type: NodeTypes.String,
                        value: "1.0.0"
                      },
                      id: {
                        type: NodeTypes.String,
                        value: "button1"
                      },
                      slots: {
                        type: NodeTypes.Object,
                        properties: {
                          default: {
                            type: NodeTypes.Array,
                            elements: []
                          }
                        }
                      },
                      src: {
                        type: NodeTypes.String,
                        value: "http://127.0.0.1:7890/static/components/arco/Typography.js"
                      },
                      props: {
                        type: NodeTypes.Object,
                        properties: {
                          content: {
                            type: NodeTypes.String,
                            value: "我是一个可以复制的文本"
                          }
                        }
                      }
                    }
                  ]
                }
              }
            },
            src: {
              type: NodeTypes.String,
              value: "http://127.0.0.1:7890/static/components/arco/container.js"
            },
            props: {
              type: NodeTypes.Object,
              properties: {
                style: {
                  type: NodeTypes.Object,
                  properties: {}
                }
              }
            }
          },
          {
            type: NodeTypes.Material,
            title: {
              type: NodeTypes.String,
              value: "按钮"
            },
            key: {
              type: NodeTypes.String,
              value: "key1"
            },
            style: {
              type: NodeTypes.Object,
              properties: {}
            },
            commonProps: {
              type: NodeTypes.Object,
              properties: {}
            },
            emits: {
              type: NodeTypes.Array,
              elements: []
            },
            listeners: {
              type: NodeTypes.Array,
              elements: []
            },
            version: {
              type: NodeTypes.String,
              value: "1.0.0"
            },
            id: {
              type: NodeTypes.String,
              value: "button1"
            },
            slots: {
              type: NodeTypes.Object,
              properties: {
                default: {
                  type: NodeTypes.Array,
                  elements: []
                }
              }
            },
            src: {
              type: NodeTypes.String,
              value: "http://127.0.0.1:7890/static/components/arco/button.js"
            },
            props: {
              type: NodeTypes.Object,
              properties: {
                name: {
                  type: NodeTypes.String,
                  value: "提交"
                },
                type: {
                  type: NodeTypes.String,
                  value: "primary"
                }
              }
            }
          },
          {
            type: NodeTypes.Material,
            title: {
              type: NodeTypes.String,
              value: "按钮"
            },
            key: {
              type: NodeTypes.String,
              value: "key1"
            },
            style: {
              type: NodeTypes.Object,
              properties: {}
            },
            commonProps: {
              type: NodeTypes.Object,
              properties: {}
            },
            emits: {
              type: NodeTypes.Array,
              elements: []
            },
            listeners: {
              type: NodeTypes.Array,
              elements: []
            },
            version: {
              type: NodeTypes.String,
              value: "1.0.0"
            },
            id: {
              type: NodeTypes.String,
              value: "time"
            },
            slots: {
              type: NodeTypes.Object,
              properties: {
                default: {
                  type: NodeTypes.Array,
                  elements: []
                }
              }
            },
            src: {
              type: NodeTypes.String,
              value: "http://127.0.0.1:7890/static/components/arco/Input.js"
            },
            props: {
              type: NodeTypes.Object,
              properties: {}
            }
          }
        ]
      }
    }
  },
  title: {
    type: NodeTypes.String,
    value: "按钮"
  },
  key: {
    type: NodeTypes.String,
    value: "key1"
  },
  style: {
    type: NodeTypes.Object,
    properties: {
      padding: {
        type: NodeTypes.String,
        value: "10px"
      }
    }
  },
  commonProps: {
    type: NodeTypes.Object,
    properties: {}
  },
  emits: {
    type: NodeTypes.Array,
    elements: []
  },
  listeners: {
    type: NodeTypes.Array,
    elements: []
  },
  version: {
    type: NodeTypes.String,
    value: "1.0.0"
  },
  id: {
    type: NodeTypes.String,
    value: "pageContainer"
  },
  props: {
    type: NodeTypes.Object,
    properties: {}
  }
};
