<template>
  <div v-for="router in routes" :key="router.name">
    <Input placeholder="请输入路由名称" />
    <Input placeholder="请输入路由路径" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@arco-design/web-vue";

type TypeRoute = {
  name: string;
  path: string;
};
const routes = ref<TypeRoute[]>([]);
</script>
