<script lang="tsx">
import { DefineComponent, PropType } from "vue";
import { ComponentRuntime } from "../core/runtime-schema";
import { getRandomStr } from "packages/shared/src";
import { GlobalProperties } from "../../../develop-vue/src";
const {
  defineAsyncComponent, //
  defineComponent,
  reactive,
  unref,
  inject
} = await System.import<typeof import("vue")>("vue");

function loadRemoteComponent<T>(url: string): DefineComponent<T> {
  return defineAsyncComponent(() => System.import(url));
}

const AsyncComponent = defineComponent({
  name: "AsyncComponent",
  props: {
    schema: {
      type: Object as PropType<ComponentRuntime>,
      required: true
    },
    domFlag: {
      type: String,
      required: true
    }
  },
  setup(props) {
    if (!props.schema) return () => null;
    const Component = loadRemoteComponent(props.schema.src);
    const globalProperties = inject<GlobalProperties>("globalProperties");
    if (!globalProperties) {
      return () => null;
    }
    // 生成插槽
    const slots = Object.entries(props.schema.slots) //
      .reduce<Record<string, () => JSX.Element[]>>((slotMapper, [slotName, slot]) => {
        const Slots = (Array.isArray(slot) ? slot : []).map(component => (
          <AsyncComponent schema={component} domFlag={props.domFlag} />
        ));
        slotMapper[slotName] = () => Slots;
        return slotMapper;
      }, {});
    const emitter = globalProperties.$events;
    const events = Object.entries(props.schema.events).reduce(
      (eventMapper, [eventName, eventItem]) => {
        const [first, ...surplus] = eventName;
        const name = `on${first.toUpperCase() + surplus.join("")}` as `on${Uppercase<string>}`;
        eventMapper[name] = (...args: unknown[]) => {
          const { invoke, target } = eventItem;
          if (typeof invoke === "function") {
            invoke(...args);
          }
          // 依次触发目标事件
          target.forEach(t => {
            if (typeof t.params === "function") {
              // 处理 params 函数参数转换器
              const params = t.params(...args);
              emitter.emit(t.event, ...(Array.isArray(params) ? params : [params]));
            } else {
              emitter.emit(t.event, ...args);
            }
          });
        };
        return eventMapper;
      },
      {} as Record<`on${Uppercase<string>}`, (...args: unknown[]) => void>
    );
    return () => (
      <Component
        style={reactive(unref(props.schema.style))}
        v-slots={slots}
        // props 可覆盖上面的数据
        {...reactive(unref(props.schema.props))}
        {...events}
        // props 中的关键字
        {...{ [props.domFlag]: props.schema.id }}
        key={`${props.schema.id}_${getRandomStr()}`} // 由内部生成的 key 具有更高的优先级
      />
    );
  }
});
export default AsyncComponent;
</script>
