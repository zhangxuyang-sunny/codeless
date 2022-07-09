<script lang="tsx">
import mitt from "mitt";
import {
  App,
  Plugin,
  Component,
  PropType,
  defineComponent,
  shallowRef,
  watch,
  computed,
  onUnmounted,
  toRefs
} from "vue";
import { Router, RouteRecordRaw } from "vue-router";
import { Store } from "pinia";
import { AbstractNode, JSValue } from "packages/x-core/src/nodes";
import { TypeGlobalProperties } from "packages/x-core/src/types/index";
import { IProjectConsumer } from "packages/x-core/src/types/project";
import { IViewConsumer } from "packages/x-core/src/types/view";

const { defineAsyncComponent } = await System.import("vue");
const RENDERER_ID = "__renderer_vue__";
const RENDERER_ENTRY = defineAsyncComponent(() => System.import("RendererEntry"));

export default defineComponent({
  name: "Renderer",
  props: {
    baseUrl: {
      type: String,
      default: ""
    },
    // 受控的当前路由
    routeName: String,
    // 受控的工程配置
    project: {
      type: Object as PropType<IProjectConsumer>,
      required: true
    },
    // 受控的页面列表
    views: {
      type: Array as PropType<IViewConsumer[]>,
      required: true
    }
  },
  setup(props) {
    const { vue, vueRouter, pinia } = window;
    const { routeName, project, views } = toRefs(props);
    const viewMap = computed(() => {
      return views.value.reduce(
        (map, view) => map.set(view.id, view),
        new Map<string, IViewConsumer>()
      );
    });

    let app: App<Element>;
    let router: Router;

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
      [project, elRef],
      () => {
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

          // 创建资料库 pinia
          if (project.value.datasets.length) {
            vue.use(pinia.createPinia());
            const piniaMap = project.value.datasets.reduce((map, dataset) => {
              return map.set(
                dataset.key,
                pinia.defineStore({
                  id: dataset.key,
                  state: () => ({
                    // pinia 必须返回一个对象
                    // 挂载在 data 字段上 (暂定)
                    data: {}
                  }),
                  // TODO
                  actions: {}
                })() // 注意这里调用一下生成 pinia atom
              );
            }, new Map<string, Store<string, { data: JSValue }>>());
            // 设置数据中心
            AbstractNode.setContext({
              datasets: Object.fromEntries(piniaMap)
            });
          }
        }
      };

      return plugin;
    };

    const createRouter = () => {
      const { views, base, mode } = project.value.router;
      // 生成路由选项
      const routes = views.flatMap<RouteRecordRaw>(view => {
        if (!viewMap.value.has(view.viewId)) return [];
        return {
          name: view.viewId,
          path: view.urlPath,
          component: defineComponent({
            name: `IView-${view.viewId}`,
            setup() {
              const viewReactive = vue.shallowRef<IViewConsumer>();
              // 连接两个 vue 实例响应式的桥梁
              watch(
                viewMap,
                () => {
                  const v = viewMap.value.get(view.viewId);
                  if (!v) return;
                  viewReactive.value = v;
                },
                { immediate: true }
              );
              return () =>
                vue.h(RENDERER_ENTRY, {
                  data: viewReactive.value?.material
                });
            }
          })
        };
      });
      const b = `${props.baseUrl}${base}`;
      return vueRouter.createRouter({
        history: {
          history: vueRouter.createWebHistory(b),
          hash: vueRouter.createWebHashHistory(b),
          memory: vueRouter.createMemoryHistory(b)
        }[mode],
        routes
      });
    };

    // 初始化 vue
    const createApp = () => {
      const HostComponent: Component = {
        name: "ProjectVue",
        setup() {
          return () => null;
        }
      };

      router = createRouter();
      HostComponent.setup = function setup() {
        return () => vue.h(vueRouter.RouterView);
      };
      return vue //
        .createApp(HostComponent)
        .use(router)
        .use(createPlatformPlugin());
    };

    return () => <div id={RENDERER_ID} ref={elRef} />;
  }
});
</script>
