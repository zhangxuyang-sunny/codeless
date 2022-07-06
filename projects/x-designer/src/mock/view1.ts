import { NodeTypes } from "packages/x-core/dist/nodes";
import { IMaterialParamsSchema } from "packages/x-core/dist/types/material";
import { IView } from "packages/x-core/dist/types/view";
export const host = process.env.NODE_ENV !== "production" ? "127.0.0.1:7890" : "119.91.65.70:3000";

const schema: IMaterialParamsSchema = {
  src: `http://${host}/static/components/arco/Button.js`,
  // src: `http://${host}/static/components/common/EmptyContainer.js`,
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
  slots: {},
  emits: [],
  listeners: []
};

export const view1: IView = {
  id: "view_1",
  version: "0.0.1",
  title: "页面1",
  description: "我的第一个页面",
  createdUser: "sunny",
  updatedUser: "sunny",
  createdAt: "",
  updatedAt: "",
  schema
};
