<!-- 帮助按钮和弹出提示 -->
<script lang="ts" setup>
import type { PropType } from "vue";
import type { IIconProps } from "@icon-park/vue-next/es/runtime";
import { Help } from "@icon-park/vue-next";
import { Tooltip } from "@arco-design/web-vue";
defineProps({
  tooltipProps: {
    type: Object as PropType<Partial<typeof Tooltip["__defaults"]>>
  },
  iconProps: {
    type: Object as PropType<IIconProps>
  },
  iconStyle: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>
  }
});
</script>

<template>
  <Tooltip v-bind="tooltipProps">
    <template v-if="!!$slots.content" #content>
      <slot name="content" />
    </template>
    <Help class="help-icon" v-bind="iconProps" :style="iconStyle" />
  </Tooltip>
</template>

<style lang="scss" scoped>
.help-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
