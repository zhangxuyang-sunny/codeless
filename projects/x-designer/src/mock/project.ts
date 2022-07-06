import { IProject } from "packages/x-core/dist/types/project";

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

const project: IProject = {
  id: "project_1",
  title: "应用1",
  router: {
    base: "/",
    mode: "history",
    views: [{ viewId: "page_1", title: "未命名页面", urlPath: "/" }]
  },
  datasets: [{ key: "dataset_1", define: "" }],
  version: "0.0.1",
  status: 1,
  description: "我的第一个应用",
  createdUser: "sunny",
  updatedUser: "sunny",
  createdAt: "",
  updatedAt: ""
};

export { project };
