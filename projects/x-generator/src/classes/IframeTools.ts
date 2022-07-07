import type usePageStore from "@generator/store/usePageStore";
import { PageSchema } from "packages/x-core";
import { Subject } from "rxjs";
import { watch } from "vue";

class IframeTools {
  private store: ReturnType<typeof usePageStore> | undefined;

  mount(store: ReturnType<typeof usePageStore> | undefined) {
    this.store = store;
    window.$iframeTools = this;

    // 只要schema 变动就会通知到iframe 需要更新数据
    watch(
      () => this.store?.getSchema || {},
      () => {
        const schema = this.store?.getSchema;
        if (schema) {
          this.update.next(schema);
        }
      },
      { deep: true }
    );
  }

  getXElement() {
    return this.store?.xElement;
  }

  getSchema() {
    return this.store?.xElement.getSchema();
  }

  setSelect(id: string) {
    this.store?.setSelectId(id);
  }

  update = new Subject<PageSchema>();
}

export default window.$iframeTools || window.top?.$iframeTools || new IframeTools();

declare global {
  interface Window {
    $iframeTools: IframeTools;
  }
}
