<script setup lang="ts">
import { defineComponent, ref } from "vue";
import IconPark from "packages/x-shared/components/IconPark.vue";
import { IconType } from "@icon-park/vue-next/es/all";
import { Tooltip } from "@arco-design/web-vue";
import SplitView from "../Common/SplitView.vue";
import Text from "./Text.vue";
import Router from "./Router.vue";

type TypePlugin = {
  Content: ReturnType<typeof defineComponent>;
  desc: string;
  icon: IconType;
};

const plugins: TypePlugin[] = [
  {
    desc: "组件",
    icon: "Components",
    Content: Text
  },
  {
    desc: "路由",
    icon: "Router",
    Content: Router
  },
  {
    desc: "接口",
    icon: "Api",
    Content: Text
  },
  {
    desc: "历史版本",
    icon: "History",
    Content: Text
  },
  {
    desc: "大纲",
    icon: "MindmapList",
    Content: Text
  }
];

const selectPlugin = ref<TypePlugin>(plugins[0]);

const handleClick = (plugin: TypePlugin) => {
  selectPlugin.value = plugin;
};
</script>

<script lang="ts">
export default {
  name: "WorkbenchPartsBar"
};
</script>

<template>
  <SplitView style="width: 48px">
    <div class="part">
      <Tooltip v-for="plugin in plugins" :key="plugin.icon" :content="plugin.desc" position="right">
        <div
          class="parts-item"
          :data-active="plugin.icon === selectPlugin.icon"
          @click="handleClick(plugin)"
        >
          <IconPark :type="plugin.icon" :size="20" />
        </div>
      </Tooltip>
    </div>
  </SplitView>
</template>

<style lang="less" scoped>
.part {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-2);
  border-right: 1px solid var(--color-neutral-3);
  padding: 10px 0;
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
</style>
