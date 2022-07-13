<script lang="tsx">
import { PropType, DefineComponent } from "vue";
import { getRandomStr } from "packages/x-shared/utils/randomString";
import { useGlobalProperties } from "../core/useGlobalProperties";
import { ComponentRuntime } from "../core/schema";
const {
  defineAsyncComponent, //
  defineComponent,
  reactive,
  unref
} = await System.import<typeof import("vue")>("vue");

function loadRemoteComponent<T>(url: string): DefineComponent<T> {
  return defineAsyncComponent(() => System.import(url));
}

export default defineComponent({
  name: "RendererEntry",
  props: {
    schema: {
      type: Object as PropType<ComponentRuntime | null>,
      default: null
    }
  },
  setup(props) {
    const globalProperties = useGlobalProperties();
    // 递归节点生成元素树
    const generateComponent = (
      node: ComponentRuntime,
      index: number
    ): (() => JSX.Element | null) => {
      const RemoteComponent = loadRemoteComponent(node.src);
      // 生成插槽
      const slots = Object.entries(node.slots) //
        .reduce<Record<string, () => JSX.Element[]>>((slotMapper, [slotName, slot]) => {
          const Slots = (Array.isArray(slot) ? slot : []).map((component, index) => {
            return generateComponent(component, index);
          });
          slotMapper[slotName] = () => Slots.map(Slot => <Slot />);
          return slotMapper;
        }, {});
      // 将 key 合并到 props
      // 由内部生成的 key 具有更高的优先级
      const _props = reactive({
        ...node.props,
        key: `${index}_${getRandomStr()}`
      });
      const style = reactive(unref(node.style));
      // 生成事件调用
      const emits = node.emits.reduce<Record<string, any>>((prev, emit) => {
        prev[`on${emit.event.replace(/^\S/, s => s.toUpperCase())}`] = async (...args: any[]) => {
          // target: 触发其他组件事件
          (emit.target || []).forEach(async ([eventName, paramsDefine]) => {
            let params: unknown;
            // TODO
            // if (paramsDefine instanceof Function) {
            //   params = await paramsDefine(...args);
            // }
            globalProperties?.$events.emit(eventName, params);
          });
          // TODO
          // // 调用方法
          // if (emit.invoke instanceof Function) {
          //   await emit.invoke(...args);
          // }
        };
        return prev;
      }, {});
      return function RemoteComponentWrapper() {
        // // 渲染条件：含有 if 属性且 if 属性为假值，不渲染组件
        // if ("if" in _props && !_props.if) {
        //   return null;
        // }
        // // 隐藏条件：含有 hidden 且 hidden 为真值，隐藏组件
        // // hidden 定义为：不显示组件，但不销毁组件，组件不占空间
        // if ("hidden" in _props && !!_props.hidden) {
        //   style.display = "none";
        // }
        // // 显示条件：含有 show 且 show 为真值，显示组件，即和 hidden 相反
        // if ("show" in _props && !!_props.show) {
        //   style.display = "unset";
        // }
        return (
          <RemoteComponent
            // 用于编辑器标识
            data-remote
            data-remote-id={node.id}
            {..._props}
            {...emits}
            style={style}
            v-slots={slots}
          />
        );
      };
    };

    return () => {
      const App = defineAsyncComponent(async () => {
        const config = props.schema;
        console.log("config:", config);
        // TODO 空状态
        if (!config || Object.keys(config).length === 0) {
          return () => null;
        }
        return generateComponent(config, -1);
      });

      return <App />;
    };
  }
});
</script>
