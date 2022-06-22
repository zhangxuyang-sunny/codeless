import { NodeTypes } from "packages/x-nodes/common/enums";
import { PageSchema } from "packages/x-nodes/nodes/PageNode";
import { host } from "packages/x-shared/utils/ImportMap";

export const page1: PageSchema = {
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
    // value: `http://${host}/static/components/common/EmptyContainer.js`
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
  // style: {
  //   type: NodeTypes.ReactiveByPinia,
  //   path: "dataset1.style"
  // },
  style: {
    type: NodeTypes.Object,
    properties: {}
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
      // loading: {
      //   type: NodeTypes.ReactiveByPinia,
      //   path: "dataset1.tableLoading"
      // },
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
};
