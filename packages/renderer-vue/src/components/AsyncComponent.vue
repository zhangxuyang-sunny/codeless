<script lang="tsx">
import type { DefineComponent, PropType } from "vue";
import type { Component } from "@codeless/schema";
import { getRandomStr } from "packages/shared/src";
import { GlobalProperties } from "../../../develop-vue/src";
import useSchema from "../store/useSchema";

const {
  defineAsyncComponent, //
  defineComponent,
  reactive,
  unref,
  inject
} = await System.import<typeof import("vue")>("vue");

const staticRoot = "//127.0.0.1:7890/static/";

function loadRemoteComponent<T>(url: string): DefineComponent<T> {
  return defineAsyncComponent(async () => (await System.import(url)).default);
}

const AsyncComponent = defineComponent({
  name: "AsyncComponent",
  props: {
    schema: {
      type: Object as PropType<Component>,
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
    const appSchema = useSchema();
    // 生成插槽
    const slots = Object.entries(props.schema.slots) //
      .reduce<Record<string, () => JSX.Element[]>>((slotMapper, [slotName, slot]) => {
        const Slots = (Array.isArray(slot) ? slot : []).map(component => (
          <AsyncComponent schema={component} domFlag={props.domFlag} />
        ));
        slotMapper[slotName] = () => Slots;
        return slotMapper;
      }, {});

    // events
    const emitter = globalProperties.$events;
    const events = props.schema.events.reduce((eventMapper, { name, invoke, target }) => {
      const [first, ...surplus] = name;
      const eventName = `on${first.toUpperCase() + surplus.join("")}` as `on${Uppercase<string>}`;
      eventMapper[eventName] = async (...args: unknown[]) => {
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
      };
      return eventMapper;
    }, {} as Record<`on${Uppercase<string>}`, (...args: unknown[]) => void>);

    // style
    type StyleObject = Partial<Record<keyof CSSStyleDeclaration, string>>;
    const style = window.vue.ref<StyleObject>({});
    window.vue.watchEffect(async () => {
      if (!props.schema.style) {
        return;
      }
      style.value = (await appSchema.resolveExpression(props.schema.style, {
        currentArguments: [],
        currentThis: null
      })) as StyleObject;
    });

    // props
    type PropsObject = Record<string, unknown>;
    const cProps = window.vue.ref<PropsObject>({});
    window.vue.watchEffect(async () => {
      const p: PropsObject = {};
      for (const k in props.schema.props) {
        const item = props.schema.props[k];
        p[k] = await appSchema.resolveExpression(item, {
          currentThis: null,
          currentArguments: []
        });
      }
      cProps.value = p;
    });

    return () => (
      <Component
        style={reactive(unref(style))}
        v-slots={slots}
        // props 可覆盖上面的数据
        {...reactive(unref(cProps))}
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
