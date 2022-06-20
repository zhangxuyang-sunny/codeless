<script lang="tsx">
import type { TypeMaterialSchema } from "@/types/schema/material";
import {
  PropType,
  defineComponent,
  defineAsyncComponent,
  reactive,
  unref,
  nextTick,
} from "vue";
import { useGlobalProperties, loadRemoteComponent } from "@/common/utils/index";

// 获取配置
const fetchConfig = async (url: string) => {
  type TypeConfigExport = {
    default?: TypeMaterialSchema;
    config?: TypeMaterialSchema;
  };
  const result = await System.import<TypeConfigExport>(url);
  // 注意：若在顶层使用 await, 将不会得到任何配置（TODO: 如何解决）
  const config = result.default || result.config;
  if (!config) {
    throw new Error(
      `[FetchConfig]: 未识别到正确的配置文件，请检查是否使用了顶层\`await\`或未使用以下形式导出：
      1. \`export default config\`
      2. \`export { config }\``
    );
  }
  return config;
};

export default defineComponent({
  name: "RendererEntry",
  props: {
    url: {
      type: String,
      default: "",
    },
    data: {
      type: Object as PropType<TypeMaterialSchema | null>,
      default: null,
    },
  },

  emits: ["asyncComponentMounted"],
  setup(props, ctx) {
    const globalProperties = useGlobalProperties();
    // 递归节点生成元素树
    const traverseToComponent = (
      node: TypeMaterialSchema
    ): (() => JSX.Element | null) => {
      const RemoteComponent = loadRemoteComponent(node.src);
      // 生成插槽
      const slots = Object.keys(node.slots) //
        .reduce<Record<string, () => JSX.Element[]>>((prev, slot) => {
          const Slots = node.slots[slot]?.map(traverseToComponent) || [];
          prev[slot] = () => Slots.map((Slot) => <Slot />);
          return prev;
        }, {});
      // 将 key 合并到 props
      // 由内部生成的 key 具有更高的优先级
      const props = reactive({
        ...node.props,
        key: node.id,
      });
      const style = reactive(unref(node.style));
      const commonProps = reactive(unref(node.commonProps));
      // 生成事件调用
      const emits = node.emits.reduce<Record<string, any>>((prev, emit) => {
        prev[`on${emit.event.replace(/^\S/, (s) => s.toUpperCase())}`] = async (
          ...args: any[]
        ) => {
          // target: 触发其他组件事件
          (emit.target || []).forEach(async ([eventName, paramsDefine]) => {
            let params: unknown;
            if (paramsDefine instanceof Function) {
              params = await paramsDefine(...args);
            }
            globalProperties?.$events.emit(eventName, params);
          });
          // 调用方法
          if (emit.invoke instanceof Function) {
            await emit.invoke(...args);
          }
        };
        return prev;
      }, {});
      return function RemoteComponentWrapper() {
        // 渲染条件：含有 if 属性且 if 属性为假值，不渲染组件
        if ("if" in commonProps && !commonProps.if) {
          return null;
        }
        // 隐藏条件：含有 hidden 且 hidden 为真值，隐藏组件
        // hidden 定义为：不显示组件，但不销毁组件，组件不占空间
        if ("hidden" in commonProps && !!commonProps.hidden) {
          style.display = "none";
        }
        // 显示条件：含有 show 且 show 为真值，显示组件，即和 hidden 相反
        if ("show" in commonProps && !!commonProps.show) {
          style.display = "unset";
        }
        return (
          <RemoteComponent
            onVnodeMounted={(ref) => {
              if (ref.el instanceof HTMLElement) {
                ctx.emit("asyncComponentMounted", ref.el)
              }
            }}
            data-remote-id={node.id}
            data-remote
            {...props}
            {...emits}
            style={style}
            v-slots={slots}
          />
        );
      };
    };

    return () => {
      const App = defineAsyncComponent(async () => {
        const config = props.url ? await fetchConfig(props.url) : props.data;
        console.log("config:", config);
        // TODO 空状态
        if (!config || Object.keys(config).length === 0) {
          return () => null;
        }
        return traverseToComponent(config);
      });

      return <App />;
    };
  },
});
</script>
