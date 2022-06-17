import type { TypeRouterPageState, TypeWorkbenchState } from "./types";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { RouterSchema, RouterNode, PageNode } from "packages/x-nodes/index";

export const useEditorStore = defineStore({
  id: "workbench",
  state: (): TypeWorkbenchState => ({
    // 选择的组件
    materialSelect: null,
    // 选择的插槽
    slotSelect: null
  }),

  actions: {
    setMaterialSelect(state: TypeWorkbenchState["materialSelect"]) {
      this.materialSelect = this.materialSelect === state ? null : state;
    },
    setSlotSelect(state: TypeWorkbenchState["slotSelect"]) {
      this.slotSelect = state;
    }
  }
});

export const useRouterConfig = defineStore({
  id: "routerConfig",
  state: (): TypeRouterPageState => {
    const id = uuid().substring(0, 8);
    return {
      routerSchema: new RouterNode().setMode("hash").getSchema(),
      pageSchemaList: [new PageNode().setTitle("首页").setUrlPath("/").setId(id).getSchema()]
    };
  },
  actions: {
    setRouterMode(mode: RouterSchema["mode"]) {
      console.log(this.routerSchema);
      this.routerSchema.mode = mode;
    },
    // 添加一个页面
    addPage() {
      const id = uuid().substring(0, 8);
      this.pageSchemaList.push(new PageNode().setId(id).setUrlPath(`/${id}`).getSchema());
    },
    // 删除一个页面
    delPage(id: string) {
      const index = this.pageSchemaList.findIndex(page => page.id.value === id);
      if (index >= 0) {
        this.pageSchemaList.splice(index, 1);
      }
    }
  },
  getters: {
    routerMode: state => {
      return state.routerSchema.mode;
    }
  }
});
