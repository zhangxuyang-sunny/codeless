import { TypeMaterial } from "packages/x-core/dist/types/material.d";

const list: TypeMaterial[] = [
  {
    id: "id_1",
    url: "xxx",
    type: 1,
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },

    collection: false,
    title: "按钮",
    image: require("../image/button.png"),
    category: "基础组件",
    name: "",
    description: "xxxx"
  },
  {
    id: "id_2",
    url: "xxxxx",
    type: 1,
    collection: false,
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    title: "Input组建",
    image: require("../image/input.png"),
    category: "基础组件",
    name: "",
    description: "xxxx"
  },
  {
    id: "id_3",
    url: "xxxxxxxx",
    type: 1,
    collection: false,
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    title: "Layout",
    image: require("../image/layout.png"),
    category: "布局组建",
    name: "",
    description: "xxxx"
  }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): Promise<TypeMaterial[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(list);
    }, 1000);
  });
};
