<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
// 一个空容器
// 可用于入口容器
// 可用于根属性隔离
import { defineComponent } from "vue";
export default defineComponent({
  name: "EmptyContainer",
});
</script>
