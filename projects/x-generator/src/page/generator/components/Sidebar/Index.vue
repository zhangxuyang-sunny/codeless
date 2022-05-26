<script lang="tsx">
import type { IconType } from "@icon-park/vue-next/es/all";
import { defineComponent, ref, shallowRef } from "vue";
import { Tooltip } from "@arco-design/web-vue";
import Api from "../Api/Index.vue";
import IconPark from "packages/x-shared/components/IconPark.vue";
import Material from "../Material/Index.vue";
import History from "../History/Index.vue";
import Outline from "../Outline/Index.vue";

export default defineComponent({
  name: "Sidebar",
  setup() {
    type TypePlugin = {
      Content: ReturnType<typeof defineComponent>;
      desc: string;
      icon: IconType;
    };

    const plugins: TypePlugin[] = [
      {
        desc: "大纲",
        icon: "MindmapList",
        Content: shallowRef(Outline)
      },
      {
        desc: "组件",
        icon: "Components",
        Content: shallowRef(Material)
      },
      {
        desc: "接口",
        icon: "Api",
        Content: shallowRef(Api)
      },
      {
        desc: "历史版本",
        icon: "History",
        Content: shallowRef(History)
      }
    ];

    const selectPlugin = ref<TypePlugin>(plugins[0]);

    const handleClick = (plugin: TypePlugin) => {
      selectPlugin.value = plugin;
    };

    return () => (
      <>
        <div class="part">
          {plugins.map(plugin => (
            <Tooltip key={plugin.icon} content={plugin.desc} position="right">
              <div
                class="parts-item"
                data-active={plugin.icon === selectPlugin.value.icon}
                onClick={() => handleClick(plugin)}
              >
                <IconPark type={plugin.icon} size={20} />
              </div>
            </Tooltip>
          ))}
        </div>
        <div class="sidebar-content">
          <selectPlugin.value.Content />
        </div>
      </>
    );
  }
});
</script>

<style lang="less" scoped>
.part {
  width: 48px;
  height: 100%;
  background-color: var(--color-bg-2);
  border-right: 1px solid var(--color-neutral-3);
  padding: 10px 0;
  border-radius: 4px;
  .parts-item {
    width: 40px;
    height: 40px;
    padding: 2px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-bottom: 10px;
    cursor: pointer;
    &[data-active="true"] {
      background-color: var(--color-primary-light-4);
      .i-icon {
        color: #fff;
      }
    }
  }
}
.sidebar-content {
  background-color: var(--color-bg-2);
  width: 320px;
  border-radius: 4px;
}
</style>
