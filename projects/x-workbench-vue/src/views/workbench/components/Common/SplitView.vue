<script setup lang="ts">
/**
 * 该组件用于包装每一块 全局可以配置隐藏与现实
 */
</script>
<template>
  <div class="split-view" visible>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.split-view {
  display: none;
  height: 100%;
  &.split-view[visible] {
    display: block;
  }
}
</style>
