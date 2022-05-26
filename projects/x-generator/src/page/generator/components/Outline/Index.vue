<template>
  <Tree :data="treeData" show-line @select="select">
    <template #switcher-icon>
      <IconDown />
    </template>
    <template #title="{ title, key }">
      <div class="tree-item" @mouseenter="setHoverId(key)" @mouseleave="setHoverId('')">
        {{ title }}
      </div>
    </template>
  </Tree>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IconDown } from "@arco-design/web-vue/es/icon";
import { Tree, TreeNodeData } from "@arco-design/web-vue";
import { usePageStore } from "../../store";
import XElement from "../../classes/XElement";

const pageStore = usePageStore();

console.log("out-line注册几次");
const generatorTree = (xElement: XElement) => {
  return {
    title: xElement.title,
    key: xElement.id,
    children: Object.entries(xElement.slots).reduce((child, [slotName, slots]) => {
      child.push({
        title: slotName + "插槽",
        key: slotName + xElement.id,
        children: slots.map(slot => generatorTree(slot))
      });
      return child;
    }, [])
  };
};

const treeData = computed(() => {
  return [generatorTree(pageStore.xElement)];
});

const select = (
  selectedKeys: Array<string | number>,
  data: { selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event }
) => {
  if (typeof data.node.key === "string") {
    data.selected && pageStore.setSelectId(data.node.key);
  }
};
</script>

<style lang="less" scoped>
.tree-item {
}
</style>
