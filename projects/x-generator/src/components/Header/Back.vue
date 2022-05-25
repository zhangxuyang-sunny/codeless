<template>
  <Button @click="handleBack">返回</Button>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "@arco-design/web-vue";

const router = useRouter();
const handleBack = () => {
  router.go(-1);
};
</script>
