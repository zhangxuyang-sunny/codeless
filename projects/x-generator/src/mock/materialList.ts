import { TypeMaterialSchema } from "@low/types/material";
import { awaitTime } from "../utils";

const list: TypeMaterialSchema[] = [
  {
    url: "",
    type: 1,
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

export default (): Promise<TypeMaterialSchema[]> => {
  return new Promise(resolve => {
    awaitTime(1000).then(() => {
      resolve(list);
    });
  });
};
