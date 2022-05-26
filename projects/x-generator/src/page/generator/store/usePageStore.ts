import { defineStore } from "pinia";
import XElement from "../classes/XElement";
import { MaterialSchema, NodeTypes, PageSchema } from "packages/x-nodes";

function traverseSchema<T extends MaterialSchema | PageSchema>(
  schema: T,
  parent: XElement | null = null,
  callback: (xElem: XElement) => void
) {
  const xElem = new XElement(schema);
  callback(xElem);
  xElem.parent = parent;
  Object.entries(schema.slots.properties).forEach(([slotName, slot]) => {
    if (slot.type === NodeTypes.Array) {
      xElem.slots[slotName] = slot.elements.map(material => {
        const slotXElem = traverseSchema(material as T, xElem, callback);
        slotXElem.slotName = slotName;
        return slotXElem;
      });
    }
  });
  return xElem;
}

export default defineStore("pageConfig", {
  state() {
    return {
      xElementMap: {} as Record<string, XElement>,

      xElement: {} as XElement,

      selectedId: "",

      hoverId: ""
    };
  },
  getters: {
    selectedXElement(): XElement {
      return this.xElementMap[this.selectedId];
    }
  },
  actions: {
    initPageStore(pageSchema: PageSchema) {
      this.xElement = traverseSchema(pageSchema, null, xElem => {
        this.xElementMap[xElem.id] = xElem;
      });
    },
    setSelectId(id: string) {
      this.selectedId = id;
    },

    setHoverId(id: string) {
      {
        this.hoverId = id;
      }
    }
  }
});
