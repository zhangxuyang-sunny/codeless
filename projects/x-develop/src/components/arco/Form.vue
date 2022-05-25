<template>
  <Form ref="formRef" :model="formProps.model" :layout="layout">
    <slot></slot>
  </Form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Form } from "@arco-design/web-vue";
import { FormProps } from "ant-design-vue";

export default defineComponent({
  name: "ArcoForm",
  components: {
    Form,
  },
  props: {
    formProps: {
      type: Object,
      default: () => ({}),
    },
    layout: {
      type: String as PropType<FormProps["layout"]>,
      default: "horizontal",
    },
  },
});
</script>
