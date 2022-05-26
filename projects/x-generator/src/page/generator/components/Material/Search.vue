<template>
  <div class="search">
    <div class="input" :class="isSearch ? 'active' : ''">
      <Input v-model:value="_value"></Input>
    </div>
    <Button :type="isSearch ? 'secondary' : 'text'" @click="isSearch = !isSearch">
      <template #icon>
        <IconSearch v-if="!isSearch" />
        <IconClose v-else />
      </template>
    </Button>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import { computed, ref } from "vue";
import { Input, Button } from "@arco-design/web-vue";
import { IconSearch, IconClose } from "@arco-design/web-vue/es/icon";
const emit = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: String as PropType<string>,
    default: ""
  }
});
const _value = computed({
  get() {
    return props.value;
  },
  set(v) {
    emit("update:value", v);
  }
});
const isSearch = ref(false);
</script>

<style lang="less" scoped>
.search {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  .input {
    overflow: hidden;
    width: 0;
    transition: width 0.3s ease-in-out;
    &.active {
      width: 70%;
    }
  }
}
</style>
