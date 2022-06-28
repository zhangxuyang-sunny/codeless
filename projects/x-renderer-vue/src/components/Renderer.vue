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
import { AbstractNode, JSValue, PageValue, ProjectValue } from "packages/x-nodes/dist";
import { TypeGlobalProperties } from "packages/x-types";

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
      type: Object as PropType<ProjectValue>,
      required: true
    },
    // 受控的页面列表
    pages: {
      type: Array as PropType<PageValue[]>,
      required: true
    }
  },
  setup(props) {
    const { vue, vueRouter, pinia } = window;
    const { routeName, project, pages } = toRefs(props);
    const pageMap = computed(() => {
      return pages.value.reduce(
        (map, schema) => map.set(schema.pageId, schema),
        new Map<string, PageValue>()
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
                    data: dataset.default
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
        if (!pageMap.value.has(view.pageId)) return [];
        return {
          name: view.pageId,
          path: view.path,
          component: defineComponent({
            name: `View-${view.pageId}`,
            setup() {
              const pageReactive = vue.shallowRef<PageValue>();
              // 连接两个 vue 实例响应式的桥梁
              watch(
                pageMap,
                () => {
                  const page = pageMap.value.get(view.pageId);
                  if (!page) return;
                  pageReactive.value = page;
                },
                { immediate: true }
              );
              return () =>
                vue.h(RENDERER_ENTRY, {
                  data: pageReactive.value?.material
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
