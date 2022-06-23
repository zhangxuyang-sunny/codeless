import { NodeTypes, ProjectSchema, RouterSchema } from "packages/x-nodes/dist";

// 路由配置
const router: RouterSchema = {
  type: NodeTypes.Router,
  base: {
    type: NodeTypes.String,
    value: "/"
  },
  mode: "history",
  views: [
    {
      title: "page1",
      vid: "page_1",
      path: "/"
    }
  ]
};

// 数据配置
// const piniaList: [] = [
// {
//   type: NodeTypes.Pinia,
//   key: {
//     type: NodeTypes.String,
//     value: "dataset1"
//   },
//   state: {
//     form: {
//       type: NodeTypes.Object,
//       properties: {
//         namNJe: {
//           type: NodeTypes.String,
//           value: ""
//         },
//         email: {
//           type: NodeTypes.String,
//           value: ""
//         },
//         big: {
//           type: NodeTypes.BigInt,
//           value: 1
//         }
//       }
//     },
//     style: {
//       type: NodeTypes.Object,
//       properties: {
//         margin: {
//           type: NodeTypes.String,
//           value: "0 100px"
//         },
//         width: {
//           type: NodeTypes.Function,
//           code: `(function () { return "auto" })()`
//         }
//       }
//     },
//     tableLoading: new BooleanNode().setValue(false).getSchema(),
//     tableList: {
//       type: NodeTypes.Array,
//       elements: [
//         {
//           type: NodeTypes.String,
//           value: "1"
//         }
//       ]
//     }
//   },
//   getters: {
//     isEmpty: {
//       type: NodeTypes.Function,
//       code: `function (state) {
//         return state.tableList.length === 0;
//       }`
//     }
//   },
//   actions: {
//     setTableLoading: {
//       type: NodeTypes.Function,
//       code: `function(status) {
//       this.tableLoading = status;
//     }`
//     },
//     setTableList: {
//       type: NodeTypes.Function,
//       code: `function (list) {
//         this.tableList = list;
//       }`
//     },
//     setTableSelect: {
//       type: NodeTypes.Function,
//       code: `function (id) {
//         this.tableSelect = id;
//       }`
//     }
//   },
//   hydrate: {
//     type: NodeTypes.Function,
//     code: `function(s,i) { console.log({s,i}) }`
//   }
// }
// ];

// const pageList: PageSchema[] = [];

const project: ProjectSchema = {
  type: NodeTypes.Project,
  router,
  datasets: [
    {
      type: NodeTypes.Dataset,
      key: {
        type: NodeTypes.String,
        value: "dataset1"
      },
      default: {
        type: NodeTypes.JSValue,
        schema: {
          type: NodeTypes.Number,
          value: 1
        }
      }
    }
  ]
};

export default project;
