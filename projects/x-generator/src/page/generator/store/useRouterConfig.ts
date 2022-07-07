import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { RouterNode, RouterSchema, PageNode, PageSchema } from "packages/x-core";
export default defineStore({
  id: "routerConfig",
  state: (): {
    routerSchema: RouterSchema;
    pageSchemaList: PageSchema[];
  } => {
    return {
      routerSchema: new RouterNode().setMode("hash").getSchema(),
      pageSchemaList: []
    };
  },
  actions: {
    initRouterConfig(pageNodes: PageSchema[]) {
      this.pageSchemaList.length = 0;
      this.pageSchemaList.push(...pageNodes);
    },
    setRouterMode(mode: RouterNode["mode"]) {
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
    },
    getPageNodeById(id: string): PageSchema | undefined {
      return this.pageSchemaList.find(p => p.id.value === id);
    }
  },
  getters: {
    routerMode: state => {
      return state.routerSchema.mode;
    }
  }
});
