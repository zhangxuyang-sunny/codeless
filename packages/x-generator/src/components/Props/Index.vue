<script lang="tsx">
import { computed, defineComponent, ref } from "vue";
import { Radio, RadioGroup } from "@arco-design/web-vue";
import EmitterEdit from "../EmitterEdit/Index.vue";
import StyleEdit from "../StyleEdit/Index.vue";
import PropertiesEdit from "../PropertiesEdit/Index.vue";

type TypePropsTab = {
  title: string;
  type: "emitter" | "style" | "properties";
};
export default defineComponent({
  setup() {
    const currentType = ref<TypePropsTab["type"]>("properties");
    const tabs: TypePropsTab[] = [
      { title: "属性", type: "properties" },
      { title: "样式", type: "style" },
      { title: "事件", type: "emitter" }
    ];

    const Content = computed(() => {
      switch (currentType.value) {
        case "emitter": {
          return () => <EmitterEdit />;
        }
        case "properties": {
          return () => <PropertiesEdit />;
        }
        case "style": {
          return () => <StyleEdit />;
        }
        default: {
          return null;
        }
      }
    });

    const Radios = tabs.map(item => <Radio value={item.type}>{item.title}</Radio>);
    return () => (
      <div class="props-container">
        <RadioGroup type="button" v-model={[currentType.value, "model-value"]}>
          {Radios}
        </RadioGroup>
        <div class="main">
          <Content.value />
        </div>
      </div>
    );
  }
});
</script>
<style lang="less" scoped>
.props-container {
  width: 320px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  .main {
    margin: 10px;
  }
}
</style>
