<template>
  <Dropdown @select="handleSelect">
    <Button class="select-page-info"
      >{{ pageTitle }}
      <IconDown />
    </Button>
    <template #content>
      <div class="select-page-overlay">
        <Doption v-for="page in pageSchemaList" :key="page.id.value" :value="page.id.value">
          {{ page.title.value }}
        </Doption>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Dropdown, Doption, Button } from "@arco-design/web-vue";
import { IconDown } from "@arco-design/web-vue/es/icon";
import { usePageConfig, useRouterConfig } from "../../store";

const { pageNode, initPageConfig } = usePageConfig();
const { pageSchemaList, getPageNodeById } = useRouterConfig();

const pageTitle = computed(() => pageNode?.title?.value || "");
const handleSelect = id => {
  const _pageNode = getPageNodeById(id);
  if (pageNode) {
    initPageConfig(_pageNode);
  }
};
</script>

<style lang="less" scoped>
.select-page-info {
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-page-overlay {
  width: 150px;
}
</style>
