<template>
  <div class="VerticalLayout">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "VerticalLayout",
  description: {
    id: "b",
    data: {
      props: [],
      slots: [
        {
          name: "default",
          title: "元素内容",
          description: "",
        },
      ],
    },
    meta: {
      name: "VerticalLayout",
      title: "垂直布局",
      description: "垂直布局容器",
      category: "布局容器",
    },
  },
});
</script>

<style scoped>
.VerticalLayout {
  display: flex;
  flex-direction: column;
}
</style>
