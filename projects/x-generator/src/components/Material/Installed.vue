<template>
  <div class="installed-container">
    <MaterialItem v-for="item in list" :key="item.url" :data="item" />
  </div>
  <Spin v-show="loading"></Spin>
</template>
<script setup lang="ts">
import { Spin } from "@arco-design/web-vue";
import useMaterialData from "./hooks/useMaterialData";
import MaterialItem from "./MaterialItem.vue";
const { list, doFetch, loading } = useMaterialData({ type: 1 });
doFetch();
</script>

<style lang="less" scoped>
.installed-container {
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(3, 95px);
  grid-column-gap: 5px;
  justify-content: center;
}
.arco-spin {
  align-self: center;
}
</style>
