<template>
  <FormItem>
    <slot></slot>
  </FormItem>
</template>
<script>
import { defineComponent } from "vue";
import { FormItem } from "@arco-design/web-vue";

export default defineComponent({
  name: "ArcoFormItem",
  components: {
    FormItem
  }
})
</script>
