import {
  MaterialStyle as TypeMaterialStyle,
  // MaterialValue as TypeMaterialConfig,
  MaterialProps as TypeMaterialProps,
  MaterialEmit as TypeMaterialEmit,
  MaterialListener as TypeMaterialListener
} from "packages/x-nodes/nodes/MaterialNode";
import { AbstractDataModel } from "./AbstractDataModel";

/**
 * 工程数据模型
 */

// // 物料协议
// export class Material extends AbstractDataModel<TypeMaterialConfig> {
//   protected data: TypeMaterialConfig = {
//     id: "",
//     key: "",
//     title: "",
//     version: "",
//     src: "",
//     style: {},
//     commonProps: {},
//     props: {},
//     slots: {},
//     emits: [],
//     listeners: []
//   };
//   static get default() {
//     return new Material().create();
//   }
// }

// 物料样式协议
export class MaterialStyle extends AbstractDataModel<TypeMaterialStyle> {
  protected data: TypeMaterialStyle = {};
}

// 物料属性协议
export class MaterialProp extends AbstractDataModel<TypeMaterialProps> {
  protected data: TypeMaterialProps = {
    type: "string",
    key: "",
    value: ""
  };
}

// 物料发射事件协议
export class MaterialEmit extends AbstractDataModel<TypeMaterialEmit> {
  protected data: TypeMaterialEmit = {
    event: "",
    target: [],
    invoke: () => {
      //
    }
  };
}

// 物料监听事件协议
export class MaterialListener extends AbstractDataModel<TypeMaterialListener> {
  protected data: TypeMaterialListener = {
    event: "",
    origin: ""
  };
}
