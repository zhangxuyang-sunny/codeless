<script setup lang="ts">
import { computed, ref } from "vue";
import { ResizeBox } from "@arco-design/web-vue";
import SplitView from "../Common/SplitView.vue";
import MaterialBuiltin from "../MaterialBuiltin.vue";

const width = ref(280);
const dyWidth = computed({
  get() {
    return width.value;
  },
  set(value: number) {
    if (value < 280) {
      width.value = 280;
    } else if (value > 600) {
      width.value = 600;
    } else {
      width.value = value;
    }
  }
});
</script>
<template>
  <ResizeBox v-model:width="dyWidth">
    <template #resize-trigger="{ direction }">
      <div
        :class="[
          `resizebox-demo`,
          `resizebox-demo-${direction === 'right' ? 'vertical' : 'horizontal'}`
        ]"
      >
        <div class="resizebox-demo-line" />
      </div>
    </template>
    <SplitView>
      <div id="workbench.parts.sidebar">
        <MaterialBuiltin />
      </div>
    </SplitView>
  </ResizeBox>
</template>

<style lang="less" scoped>
.workbench.parts.sidebar,
.arco-resizebox {
  height: 100%;
}
.resizebox-demo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-2);
  .resizebox-demo-line {
    visibility: hidden;
    flex: 1;
    background-color: rgb(var(--arcoblue-6));
    transition: all 0.3s;
  }
  &:hover .resizebox-demo-line {
    visibility: visible;
  }
}
.resizebox-demo-vertical {
  flex-direction: column;
}
.resizebox-demo-vertical .resizebox-demo-line {
  width: 2px;
  height: 100%;
}
</style>
