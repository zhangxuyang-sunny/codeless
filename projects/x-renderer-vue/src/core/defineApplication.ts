import mitt from "mitt";
import {
  App,
  Plugin,
  Component as VueComponent,
  PropType,
  defineComponent,
  shallowRef,
  watch,
  onUnmounted,
  toRefs,
  createElementVNode
} from "vue";
import { Router, RouteRecordRaw } from "vue-router";
import { StateTree, Store } from "pinia";
import { TypeGlobalProperties } from "packages/x-core/src/types";
import { ApplicationRuntime } from "./schema";
import RendererEntry from "../components/RendererEntry.vue";

// 依赖
type Dependencies = {
  vue: typeof import("vue");
  vueRouter: typeof import("vue-router");
  pinia: typeof import("pinia");
};

// 渲染节点 id
const RENDERER_ID = "__renderer_vue__";

export const defineApplication = (dependencies: Dependencies) => {
  const { vue, vueRouter, pinia } = dependencies;

  // 平台 vue 插件
  const createPlatformPlugin = () => {
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

    // 1. 注入平台标准数据
    // 2. 提取组件核心信息
    // 3. 注入资料库管理
    const plugin: Plugin = {
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

    return plugin;
  };

  return defineComponent({
    props: {
      baseUrl: {
        type: String,
        default: ""
      },
      // 受控的当前路由
      routeName: String,
      // 受控的工程配置
      schema: {
        type: Object as PropType<ApplicationRuntime>,
        required: true
      }
    },
    setup(props) {
      const { routeName, schema } = toRefs(props);

      let app!: App<Element>;
      let router!: Router;

      const elRef = shallowRef<HTMLDivElement>();

      onUnmounted(() => {
        app?.unmount();
      });

      // routeName 控制当前页面
      watch(routeName, () => {
        const router = vueRouter.useRouter();
        router.replace({
          name: routeName.value
        });
      });

      // 重建路由，重载页面
      watch(
        [schema, elRef],
        () => {
          console.log({ runtime: schema.value });
          if (!elRef.value) return;
          app?.unmount();
          app = createApp();
          if (elRef.value instanceof HTMLDivElement) {
            app.mount(elRef.value);
          } else {
            app.mount(`#${RENDERER_ID}`);
          }
        },
        { immediate: true }
      );

      const createRouter = () => {
        const { router, pages } = schema.value;
        const base = `${props.baseUrl}${router.base}`;
        return vueRouter.createRouter({
          history: {
            history: vueRouter.createWebHistory(base),
            hash: vueRouter.createWebHashHistory(base),
            memory: vueRouter.createMemoryHistory(base)
          }[router.mode],
          // 生成路由选项
          routes: pages.map<RouteRecordRaw>(page => {
            return {
              ...page,
              component: defineComponent({
                name: `RouteView-${page.name}`,
                render() {
                  return vue.h(RendererEntry, {
                    schema: page.component
                  });
                }
              })
            };
          })
        });
      };

      // 初始化 vue
      const createApp = () => {
        const HostComponent: VueComponent = {
          name: "Application",
          setup() {
            return () => null;
          }
        };

        router = createRouter();
        HostComponent.setup = function setup() {
          return () => vue.h(vueRouter.RouterView);
        };
        const app = vue //
          .createApp(HostComponent)
          .use(router)
          .use(createPlatformPlugin());
        // 创建 pinia
        if (schema.value?.datasets.length) {
          app.use(pinia.createPinia());
          const piniaMap = schema.value.datasets.reduce((map, dataset) => {
            const store = pinia.defineStore(dataset.name, dataset.define)(); // 注意这里调用一下生成 pinia
            schema.value.context.datasets[dataset.name] = store;
            return map.set(dataset.name, store);
          }, new Map<string, Store<string, StateTree>>());
          console.log({ piniaMap });
        }
        return app;
      };
      return () => createElementVNode("div", { id: RENDERER_ID, ref: elRef });
    }
  });
};
