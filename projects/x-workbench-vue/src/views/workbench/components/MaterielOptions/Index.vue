<script lang="tsx">
import { defineComponent, KeepAlive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/modules/workbench/index";
import { Empty, Radio } from "@arco-design/web-vue";
import Props from "./Props.vue";
import Style from "./Style.vue";
import Slots from "./Slots.vue";
import Emits from "./Emits.vue";
import Listeners from "./Listeners.vue";

// 组件配置面板
export default defineComponent({
  name: "MaterialOptions",
  setup() {
    const editorStore = useEditorStore();
    const { materialSelect } = storeToRefs(editorStore);
    const selectIndex = ref(0);
    return () => {
      if (!materialSelect.value) {
        return <Empty class="empty-status" description="无配置" />;
      }

      const { meta, options } = materialSelect.value;
      const panelMapper = [
        {
          title: "属性",
          Content: () => <Props meta={meta} propList={options.props || []} />
        },
        {
          title: "样式",
          Content: () => <Style />
        },
        {
          title: "插槽",
          Content: () => <Slots slotList={options.slots || []} />
        },
        {
          title: "触发",
          Content: () => <Emits emitList={options.emits || []} />
        },
        {
          title: "监听",
          Content: () => <Listeners listenerList={options.listeners || []} />
        }
      ];
      const OptionContent = panelMapper[selectIndex.value].Content;
      return (
        <div class="component-options">
          <h4 class="title">{meta.title}</h4>
          <div class="ratio">
            <Radio.Group class="radio-group" type="button" v-model={selectIndex.value}>
              {panelMapper.map((item, idx) => (
                <Radio value={idx}>{item.title}</Radio>
              ))}
            </Radio.Group>
          </div>
          <div class="option-content">
            <KeepAlive>
              <OptionContent />
            </KeepAlive>
          </div>
        </div>
      );
    };
  }
});
</script>

<style lang="less" scoped>
.empty-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.component-options {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .title {
    margin: 0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    color: var(--color-text-1);
    border-bottom: 1px solid var(--color-border-1);
  }
  .ratio {
    width: 100%;
    display: flex;
    justify-content: center;
    .radio-group {
      display: flex;
      justify-content: center;
      width: 100%;
      :deep(.arco-radio-button) {
        flex-grow: 1;
        text-align: center;
      }
    }
  }
  .option-content {
    height: 100%;
    margin-top: 10px;
    overflow: auto;
  }
}
</style>
