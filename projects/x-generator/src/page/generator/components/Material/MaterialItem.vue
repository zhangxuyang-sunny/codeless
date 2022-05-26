<template>
  <Popover
    :popup-visible="popupVisible"
    class="material-preview-popover"
    :popup-container="popupContainer"
    arrow-class="material-arrow-popover"
    position="right"
    trigger="hover"
  >
    <div
      class="material-item"
      :draggable="draggable"
      ref="materialItemEle"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @mouseenter="popupVisible = true"
      @mouseleave="popupVisible = false"
    >
      <img draggable="false" class="material-image" :src="data.meta.image" alt="" />
      <div class="title">{{ data.meta.title }}</div>
    </div>
    <template #content>
      <img style="width: 300px" :src="data.meta.image" alt="" />
    </template>
  </Popover>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, onMounted, ref } from "vue";
import { Popover } from "@arco-design/web-vue";
import { TypeMaterialSchema } from "@low/types/material";
defineProps({
  data: {
    type: Object as PropType<TypeMaterialSchema>,
    require: true
  },
  draggable: {
    type: Boolean as PropType<boolean>,
    default: true
  }
});

const popupVisible = ref(false);
const materialItemEle = ref<HTMLDivElement>();
const popupContainer = ref<HTMLElement>();

const dragStart = (e: DragEvent) => {
  popupVisible.value = false;
  e.dataTransfer.setData("text/plain", "testData");
};
const dragEnd = () => {
  console.log(2);
};

onMounted(() => {
  popupContainer.value = materialItemEle.value.parentElement;
});
</script>

<style lang="less" scoped>
.material-item {
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
  height: 100px;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  cursor: grab;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
  .material-image {
    width: 62px;
    height: 52px;
    // height: 32px;
    object-fit: contain;
  }

  .material-preview-content {
    pointer-events: none;
    .preview-image {
      width: 200px;
    }
  }
}
</style>
<style lang="less">
.material-preview-popover {
  pointer-events: none;
  left: unset !important;
  top: unset !important;
  transform: translateX(320px);
  .material-arrow-popover {
    display: none;
  }
}
</style>
