const host = process.env.NODE_ENV !== "production" ? "127.0.0.1:7890" : "119.91.65.70:3000";

export const page1 = {
  type: "PAGE",
  id: {
    type: "STRING",
    value: "page1"
  },
  key: {
    type: "STRING",
    value: "button_0"
  },
  title: {
    type: "STRING",
    value: "按钮"
  },
  urlPath: {
    type: "STRING",
    value: "/"
  },
  version: {
    type: "STRING",
    value: "0.0.1"
  },
  src: {
    type: "STRING",
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
    type: "OBJECT",
    properties: {}
  },
  commonProps: {
    type: "OBJECT",
    properties: {}
  },
  props: {
    type: "OBJECT",
    properties: {
      type: {
        type: "STRING",
        value: "primary"
      },
      // loading: {
      //   type: NodeTypes.ReactiveByPinia,
      //   path: "dataset1.tableLoading"
      // },
      onClick: {
        type: "FUNCTION",
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
    type: "OBJECT",
    properties: {
      default: {
        type: "ARRAY",
        elements: []
      }
    }
  },
  emits: {
    type: "ARRAY",
    elements: []
  },
  listeners: {
    type: "ARRAY",
    elements: []
  }
};
