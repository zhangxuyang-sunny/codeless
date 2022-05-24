import { defineStore } from "pinia";
import { PageSchema } from "@low/nodes";
type TypePageConfigState = {
  pageNode: PageSchema;
};
export default defineStore("pageConfig", {
  state(): TypePageConfigState {
    return {
      pageNode: {} as PageSchema
    };
  },
  actions: {
    initPageConfig(pageNode: PageSchema) {
      /**
       * @todo 这里有问题 不能这么搞
       */
      Object.assign(this.pageNode, pageNode);
    }
  }
});
