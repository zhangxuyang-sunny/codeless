import { host } from "packages/x-shared/utils/ImportMap";
import {
  PageSchema,
  PiniaSchema,
  RouterSchema,
  ProjectSchema,
  NodeTypes,
  BooleanNode
} from "packages/x-nodes/index";

// 路由配置
const router: RouterSchema = {
  type: NodeTypes.Router,
  base: {
    type: NodeTypes.String,
    value: "/generator"
  },
  mode: "history"
};

// 数据配置
const piniaList: PiniaSchema[] = [
  {
    type: NodeTypes.Pinia,
    key: {
      type: NodeTypes.String,
      value: "dataset1"
    },
    state: {
      form: {
        type: NodeTypes.Object,
        properties: {
          namNJe: {
            type: NodeTypes.String,
            value: ""
          },
          email: {
            type: NodeTypes.String,
            value: ""
          },
          big: {
            type: NodeTypes.BigInt,
            value: 1
          }
        }
      },
      style: {
        type: NodeTypes.Object,
        properties: {
          margin: {
            type: NodeTypes.String,
            value: "0 100px"
          },
          width: {
            type: NodeTypes.Function,
            code: `(function () { return "auto" })()`
          }
        }
      },
      tableLoading: new BooleanNode().setValue(false).getSchema(),
      tableList: {
        type: NodeTypes.Array,
        elements: [
          {
            type: NodeTypes.String,
            value: "1"
          }
        ]
      }
    },
    getters: {
      isEmpty: {
        type: NodeTypes.Function,
        code: `function (state) {
          return state.tableList.length === 0;
        }`
      }
    },
    actions: {
      setTableLoading: {
        type: NodeTypes.Function,
        code: `function(status) {
        this.tableLoading = status;
      }`
      },
      setTableList: {
        type: NodeTypes.Function,
        code: `function (list) {
          this.tableList = list;
        }`
      },
      setTableSelect: {
        type: NodeTypes.Function,
        code: `function (id) {
          this.tableSelect = id;
        }`
      }
    },
    hydrate: {
      type: NodeTypes.Function,
      code: `function(s,i) { console.log({s,i}) }`
    }
  }
];

const pageList: PageSchema[] = [
  {
    type: NodeTypes.Page,
    id: {
      type: NodeTypes.String,
      value: "page1"
    },
    key: {
      type: NodeTypes.String,
      value: "button_0"
    },
    title: {
      type: NodeTypes.String,
      value: "按钮"
    },
    urlPath: {
      type: NodeTypes.String,
      value: "/"
    },
    version: {
      type: NodeTypes.String,
      value: "0.0.1"
    },
    src: {
      type: NodeTypes.String,
      value: `http://${host}/static/components/arco/Button.js`
    },
    // style: {
    //   type: 'Function',
    //   value: `function () {
    //     return {
    //       margin: '0 10px'
    //     }
    //   }()`
    // },
    // style: {
    //   type: 'Object',
    //   properties: {
    //     margin: {
    //       type: 'String',
    //       value: '0 10px'
    //     }
    //   }
    // },
    style: {
      type: NodeTypes.ReactiveByPinia,
      path: "dataset1.style"
    },
    commonProps: {
      type: NodeTypes.Object,
      properties: {}
    },
    props: {
      type: NodeTypes.Object,
      properties: {
        type: {
          type: NodeTypes.String,
          value: "primary"
        },
        loading: {
          type: NodeTypes.ReactiveByPinia,
          path: "dataset1.tableLoading"
        },
        onClick: {
          type: NodeTypes.Function,
          code: `async function (e) {
            console.log("this", this)
            console.log("context", context)
            console.log("e", e)
            context.piniaRecord.dataset1.tableLoading = !context.piniaRecord.dataset1.tableLoading;
            context.piniaRecord.dataset1.style.margin = "0";
            await new Promise((resolve) => setTimeout(resolve, 1000));
            context.piniaRecord.dataset1.tableLoading = false;
            context.piniaRecord.dataset1.style.margin = "0 100px";
          }`,
          useStrict: false
        }
      }
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
    emits: {
      type: NodeTypes.Array,
      elements: []
    },
    listeners: {
      type: NodeTypes.Array,
      elements: []
    }
  }
];

const project: ProjectSchema = {
  type: NodeTypes.Project,
  router,
  piniaList,
  pageList
};

export default project;
