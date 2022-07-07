import { TypeMaterial } from "packages/x-types/material";

const list: TypeMaterial[] = [
  {
    url: "",
    type: 1,
    // version: "0.0.0",
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    collection: false,
    meta: {
      title: "按钮",
      image: require("../image/button.png"),
      category: "基础组件",
      name: "",
      description: "xxxx"
    }
  },
  {
    url: "",
    type: 1,
    // version: "0.0.0",
    collection: false,
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "Input组建",
      image: require("../image/input.png"),
      category: "基础组件",
      name: "",
      description: "xxxx"
    }
  },
  {
    url: "",
    // version: "0.0.0",
    type: 1,
    collection: false,
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "Layout",
      image: require("../image/layout.png"),
      category: "布局组建",
      name: "",
      description: "xxxx"
    }
  }
];

export default (): Promise<TypeMaterial[]> => {
  return new Promise(resolve => {
    resolve(list);
  });
};
