import type { App, Plugin } from "vue";
import type { TypeGlobalProperties } from "packages/x-types/index";

import mitt from "mitt";
import { shallowRef, onUnmounted } from "vue";
import { AbstractNode } from "packages/x-nodes/common/AbstractNode";
import { VueProjectNode, VueProjectSchema } from "packages/x-nodes/nodes-vue";
import loadRemoteComponent from "packages/x-shared/utils/loadRemoteComponent";

const remotePkg = {
  vue: () => System.import<typeof import("vue")>("vue"),
  vueRouter: () => System.import<typeof import("vue-router")>("vue-router"),
  pinia: () => System.import<typeof import("pinia")>("pinia")
};

async function loadPkg() {
  const [vue, vueRouter, pinia] = await Promise.all([
    remotePkg.vue(),
    remotePkg.vueRouter(),
    remotePkg.pinia()
  ]);

  return { vue, vueRouter, pinia };
}

export default function useCreateRenderApp() {
  const projectApp = shallowRef<App<Element> | null>(null);

  const getPlatformPlugin = (vue: typeof import("vue")) => {
    // 全局属性提供标准统一的数据资料
    const globalProperties: TypeGlobalProperties = {
      $events: mitt<Record<string, unknown>>(),
      $refs: new Map(),
      $utils: {
        getKey() {
          const instance = vue.getCurrentInstance();
          return String(instance?.vnode.key) || "";
        },
        getInstance() {
          return vue.getCurrentInstance();
        }
      }
    };

    // 平台插件
    // 1. 注入平台标准数据
    // 2. 提取组件核心信息
    const platformPlugin: Plugin = {
      install(vue) {
        Object.assign(vue.config.globalProperties, globalProperties);
        vue.provide("globalProperties", globalProperties);
        vue.mixin({
          created() {
            globalProperties.$refs.set(`${this.$.type.name}_${this.$.vnode.key}`, this.$);
          },
          unmounted() {
            globalProperties.$refs.delete(this.$.type.name);
          }
        });
      }
    };

    return platformPlugin;
  };

  // 创建工程页面
  const createProjectApp = async (schema: VueProjectSchema) => {
    const { vue, vueRouter, pinia } = await loadPkg();
    const project = new VueProjectNode() //
      .setPackages({ vue, vueRouter, pinia })
      .setSchema(schema);

    if (process.env.NODE_ENV === "development") {
      console.log("多页面配置schema", schema);
      console.log("多页面配置实例", project);
      console.log("多页面配置运行时", project.getValue());
    }

    const app = vue.createApp({
      name: "Project",
      render() {
        return vue.h(vueRouter.RouterView);
      }
    });

    projectApp.value = app;
    // 使用平台插件
    app.use(getPlatformPlugin(vue));
    // 注册 pinia
    app.use(pinia.createPinia());
    project.getPiniaList().forEach(item => {
      const { id, ...options } = item;
      const store = pinia.defineStore(id, options)();
      AbstractNode.setPiniaStore(id, store);
    });
    // 解析 schema
    const router = project.getRouter();
    const pageList = project.getPageList();
    const routerInstance = vueRouter.createRouter({
      history: {
        history: vueRouter.createWebHistory(router.base),
        hash: vueRouter.createWebHashHistory(router.base),
        memory: vueRouter.createMemoryHistory(router.base)
      }[router.mode],
      routes: pageList.map(page => ({
        name: page.id,
        path: page.urlPath,
        component: vue.h(loadRemoteComponent("RendererEntry"), { data: page })
      }))
    });
    // 注册路由
    app.use(routerInstance);
    return app;
  };

  // 卸载 app
  onUnmounted(() => {
    if (projectApp.value) {
      projectApp.value.unmount();
    }
  });
  return {
    createProjectApp,
    projectApp
  };
}
