<template>
  <Space direction="vertical">
    <DatePicker v-model:value="value1" />
    <MonthPicker v-model:value="value2" placeholder="Select month" />
    <RangePicker v-model:value="value3" />
    <WeekPicker v-model:value="value4" placeholder="Select week" />
  </Space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Space, DatePicker, MonthPicker, RangePicker, WeekPicker } from "ant-design-vue";
export default defineComponent({
  components: {
    Space,
    DatePicker,
    MonthPicker,
    RangePicker,
    WeekPicker
  },
  setup() {
    return {
      value1: ref(),
      value2: ref(),
      value3: ref([]),
      value4: ref(),
    };
  },
});
</script>
