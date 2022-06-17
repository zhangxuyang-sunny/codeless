import mitt from "mitt";
import { App, ComponentInternalInstance, getCurrentInstance } from "vue";

enum CONSTANT {
  GLOBAL_CONTEXT_KEY = "$global",
  COMPONENT_PREFIX = "Low"
}

const emitter = mitt();

emitter.on("*", console.log);

const globalDataset = {
  emitter,
  refs: new Map<string, ComponentInternalInstance>(),
  utils: Object.freeze({
    hooks: Object.freeze({
      useEmit() {
        const $ = getCurrentInstance();
        return (event: string, arg: unknown) => {
          globalDataset.emitter.emit(`${$?.attrs["low-id"]}:${event}`, arg);
        };
      }
    })
  })
};

export type TypeGlobalDataset = typeof globalDataset;

const LowCodePlugin = {
  install: (app: App) => {
    console.log(app);
    app.provide(CONSTANT.GLOBAL_CONTEXT_KEY, globalDataset);
    app.mixin({
      created() {
        // 将组件实例挂载到 refs
        const $ = getCurrentInstance();
        if (!$) {
          console.warn(`[LowCodePlugin] at created 未获取到实例`);
          return;
        }
        const name = $.type.name || "";
        if (name.startsWith(CONSTANT.COMPONENT_PREFIX)) {
          globalDataset.refs.set(name, $);
        }
      },
      unmounted() {
        // 将组件实例从 refs 中卸载
        const $ = getCurrentInstance();
        if (!$) {
          console.warn(`[LowCodePlugin] at unmounted 未获取到实例`);
          return;
        }
        const name = $.type.name || "";
        if (name.startsWith(CONSTANT.COMPONENT_PREFIX)) {
          globalDataset.refs.delete(name);
        }
      }
    });
  }
};

export default LowCodePlugin;
