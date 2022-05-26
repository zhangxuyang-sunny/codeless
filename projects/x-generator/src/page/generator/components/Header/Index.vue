<template>
  <div class="generator-header">
    <div class="left">
      <BackVue />
      <Divider direction="vertical" />
      <SelectPageVue />
      <RouterSetterButton />
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup lang="ts">
import { Divider } from "@arco-design/web-vue";
import BackVue from "./Back.vue";
import SelectPageVue from "./SelectPage.vue";
import RouterSetterButton from "../Router/RouterSetterButton.vue";
</script>
<style lang="less" scoped>
.generator-header {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 2px 10px;
  background-color: #fff;
  .left,
  .right {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
