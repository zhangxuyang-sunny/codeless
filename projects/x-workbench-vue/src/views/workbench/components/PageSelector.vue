<script lang="ts" setup>
import { ref } from "vue";
import { useRouterConfig } from "@/stores/modules/workbench";
import { Select, Option } from "@arco-design/web-vue";
const { pageSchemaList } = useRouterConfig();
const currentPage = ref(pageSchemaList.at(-1)?.id.value || "");
console.log(1, currentPage.value);
</script>

<template>
  <div class="page-selector">
    <Select size="small" v-model:model-value="currentPage">
      <Option v-for="item in pageSchemaList" :key="item.id.value" :value="item.id.value">
        {{ item.title.value }} | {{ item.id.value }}
      </Option>
    </Select>
  </div>
</template>

<style lang="less" scoped>
.page-selector {
  display: inline-flex;
  align-items: center;
  width: auto;
}
</style>
