<template>
  <div class="HorizontalLayout">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HorizontalLayout"
})
</script>

<style scoped>
.HorizontalLayout {
  display: flex;
  align-items: center;
}
</style>
