import { MaterialData } from "@lowcode/types";

const list: MaterialData[] = [
  {
    id: "id_1",
    version: "0.0.0",
    createdAt: "",
    updatedAt: "",
    createdUser: "",
    updatedUser: "",
    collection: false,
    type: 1,
    category: "基础组件",
    schema: {
      type: "component",
      src: "xxx",
      setterOptions: {
        props: [],
        slots: [],
        emits: [],
        listeners: []
      },

      title: "按钮",
      description: "xxxx",
      snapshots: [require("../image/button.png")]
    }
  },
  {
    id: "id_2",
    version: "0.0.0",
    createdAt: "",
    updatedAt: "",
    createdUser: "",
    updatedUser: "",
    collection: false,
    type: 1,
    category: "基础组件",
    schema: {
      type: "component",
      src: "xxx",
      setterOptions: {
        props: [],
        slots: [],
        emits: [],
        listeners: []
      },
      title: "Input组件",
      description: "xxxx",
      snapshots: [require("../image/input.png")]
    }
  },
  {
    id: "id_3",
    version: "0.0.0",
    createdAt: "",
    updatedAt: "",
    createdUser: "",
    updatedUser: "",
    collection: false,
    type: 1,
    category: "布局组件",
    schema: {
      type: "component",
      src: "xxx",
      setterOptions: {
        props: [],
        slots: [],
        emits: [],
        listeners: []
      },
      title: "Layout",
      description: "xxxx",
      snapshots: [require("../image/layout.png")]
    }
  }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): Promise<MaterialData[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(list);
    }, 1000);
  });
};
