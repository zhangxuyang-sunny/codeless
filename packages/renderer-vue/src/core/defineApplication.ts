import type { StateTree } from "pinia";
import type { Router, RouteRecordRaw } from "vue-router";
import type { Application } from "@codeless/schema";
import type { GlobalProperties } from "@codeless/develop-vue";
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
  createElementVNode,
  onMounted,
  nextTick
} from "vue";
import EventEmitter2 from "eventemitter2";
import { context } from "./Context";
import { loadRemotePackages } from "../utils/common";
import useSchema from "../store/useSchema";
import AsyncComponent from "../components/AsyncComponent.vue";

const { vue, vueRouter, pinia } = await loadRemotePackages();
context.setPackage(vue);
// 渲染节点 id
const RENDERER_ID = "__renderer_vue__";
// 低代码组件节点 dom id 属性名
const COMPONENT_ID_ATTR = "data-component-id";

export const defineApplication = () => {
  // 平台 vue 插件
  const createPlatformPlugin = (schema: Application) => {
    const appSchema = useSchema();
    const emitter = new EventEmitter2(schema.eventsOptions);
    schema.listeners.forEach(listener => {
      const { event, target, invoke, once } = listener;
      (once ? emitter.once : emitter.on).call(emitter, event, async (...args: unknown[]) => {
        // invoke 比 target 优先调用
        if (invoke) {
          await appSchema.resolveExpression(invoke, {
            currentThis: null,
            currentArguments: args
          });
        }
        // 依次触发目标事件
        for (const t of target) {
          // 处理 params 函数参数函数
          if (t.params) {
            const params = await appSchema.resolveExpression(t.params, {
              currentThis: null,
              currentArguments: args
            });
            emitter.emit(t.event, ...(Array.isArray(params) ? params : [params]));
          } else {
            emitter.emit(t.event, ...args);
          }
        }
      });
    });
    // 全局属性提供标准统一的数据资料
    const globalProperties: GlobalProperties = {
      $events: emitter,
      $refs: new Map(),
      $utils: {
        getComponentId() {
          const instance = vue.getCurrentInstance();
          const k = instance?.attrs[COMPONENT_ID_ATTR];
          return typeof k === "string" ? k : null;
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
        // 低代码组件注册引用至 globalProperties.$refs
        vue.mixin({
          created() {
            const id = this.$.attrs[COMPONENT_ID_ATTR] as string;
            if (id) globalProperties.$refs.set(id, this.$);
          },
          unmounted() {
            const id = this.$.attrs[COMPONENT_ID_ATTR] as string;
            if (id) globalProperties.$refs.delete(id);
          }
        });
        // 注入低代码组件生命周期事件
        vue.mixin(
          [
            "beforeCreate",
            "created",
            "beforeMount",
            "mounted",
            "beforeUpdated",
            "updated",
            "beforeUnmount",
            "unmounted",
            "activated",
            "deactivated"
          ].reduce((result, cycle) => {
            result[cycle] = function () {
              const id = this.$.attrs[COMPONENT_ID_ATTR] as string;
              if (id) globalProperties.$events.emit(`${id}:${cycle}`, this.$);
            };
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }, {} as Record<string, any>)
        );
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
        type: Object as PropType<Application>,
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

      const loadApp = async () => {
        if (!elRef.value) return;
        app?.unmount();
        await nextTick();
        app = await createApp();
        if (elRef.value instanceof HTMLDivElement) {
          app.mount(elRef.value);
        } else {
          app.mount(`#${RENDERER_ID}`);
        }
      };

      const appSchema = useSchema();
      watch(
        schema,
        () => {
          appSchema.setSchema(schema.value);
        },
        { immediate: true }
      );

      // 重建路由，重载页面
      watch(schema, loadApp);

      onMounted(() => {
        loadApp();
      });

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
                name: `RouteView-${page.path}`,
                render() {
                  return vue.h(AsyncComponent, {
                    schema: page.component,
                    domFlag: COMPONENT_ID_ATTR
                  });
                }
              })
            };
          })
        });
      };

      // 初始化 vue
      const createApp = async () => {
        router = createRouter();
        const HostComponent: VueComponent = {
          name: "Application",
          setup() {
            return () => vue.h(vueRouter.RouterView);
          }
        };
        const app = vue //
          .createApp(HostComponent)
          .use(router)
          .use(createPlatformPlugin(schema.value));
        // 创建 pinia
        if (schema.value?.stores.length) {
          app.use(pinia.createPinia());
          // const piniaMap = new Map<string, Store<string, StateTree>>();
          const appSchema = useSchema();
          for (const dataset of schema.value.stores) {
            const state = (await appSchema.resolveExpression(dataset.define.state, {
              currentThis: null,
              currentArguments: []
            })) as StateTree;
            const actions: Record<string, (...args: unknown[]) => unknown> = {};
            for (const action of dataset.define.actions) {
              actions[action.name] = async (...args: unknown[]) => {
                return await appSchema.resolveExpression(action.expression, {
                  currentThis: null,
                  currentArguments: args // TODO actions 的参数应该怎么传递给函数
                });
              };
            }
            const store = pinia.defineStore({
              id: dataset.name,
              state: () => state
            })(); // 注意这里调用一下生成 pinia
            context.setStore(dataset.name, {
              store,
              actions
            });
            // piniaMap.set(dataset.name, store);
          }
        }
        return app;
      };
      return () => createElementVNode("div", { id: RENDERER_ID, ref: elRef });
    }
  });
};
