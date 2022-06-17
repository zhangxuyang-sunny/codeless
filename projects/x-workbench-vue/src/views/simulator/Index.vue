<template>
  <div>
    <micro-app name="simulator" url="http://localhost:4000" baseroute="/generator" />
  </div>
</template>
<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Simulator"
});
</script>
