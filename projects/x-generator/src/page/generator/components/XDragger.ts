// import { v4 as uuidV4 } from "uuid";

// const enum DividerType {
//   left = 0,
//   right = 1,
//   top = 2,
//   bottom = 3
// }

// export default class XDragger {
//   constructor(elements: HTMLElement[]) {
//     elements.forEach(element => {
//       // 设置 drag 信息
//       element.setAttribute("draggable", "true");
//       element.setAttribute("data-x-component-id", uuidV4());
//       element.addEventListener("dragover", event => {
//         console.log(event);
//       });
//     });
//   }

//   getELementById(id: string) {
//     return document.querySelector(`[data-drag-id="${id}"]`);
//   }

//   setDivider(id: string, type: DividerType) {
//     const el = this.getELementById(id);
//   }
// }
