<script lang="tsx">
import { DefineComponent, PropType } from "vue";
import { Component, isJSExpression } from "@codeless/schema";
import { getRandomStr } from "packages/shared/src";
import { GlobalProperties } from "../../../develop-vue/src";
import { context } from "../core/Context";

const {
  defineAsyncComponent, //
  defineComponent,
  reactive,
  unref,
  inject
} = await System.import<typeof import("vue")>("vue");

const staticRoot = "//127.0.0.1:7890/static/";

function loadRemoteComponent<T>(url: string): DefineComponent<T> {
  return defineAsyncComponent(() => System.import(url));
}

const AsyncComponent = defineComponent({
  name: "AsyncComponent",
  props: {
    schema: {
      type: Object as PropType<Component<true>>,
      required: true
    },
    domFlag: {
      type: String,
      required: true
    }
  },
  setup(props) {
    if (!props.schema) return () => null;
    const Component = loadRemoteComponent(staticRoot + props.schema.src);
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
          if (typeof invoke?.runtime === "function") {
            invoke.runtime.apply(context, args);
          }
          // 依次触发目标事件
          target.forEach(t => {
            if (typeof t.params?.runtime === "function") {
              // 处理 params 函数参数转换器
              const params = t.params.runtime.apply(context, args);
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
    const style = window.vue.computed(() =>
      isJSExpression(props.schema.style, true) ? props.schema.style.runtime.call(context) : {}
    );
    const _props = window.vue.computed(() => {
      const p: Record<string, unknown> = {};
      for (const k in props.schema.props) {
        const item = props.schema.props[k];
        p[k] = item.runtime.call(context);
      }
      return p;
    });
    return () => (
      <Component
        style={reactive(unref(style))}
        v-slots={slots}
        // props 可覆盖上面的数据
        {...reactive(unref(_props))}
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
