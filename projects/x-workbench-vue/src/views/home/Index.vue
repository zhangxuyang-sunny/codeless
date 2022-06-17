<template>
  <div class="home">
    <h1 class="title">Welcome!</h1>
    <Space>
      <Button type="primary" @click="workbench">编辑器</Button>
      <Button @click="renderer">渲染器</Button>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, Space } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Button,
    Space
  },
  setup() {
    const router = useRouter();
    return {
      workbench() {
        router.push("/workbench");
      },
      renderer() {
        window.open("http://localhost:4000", "_blank");
      }
    };
  }
});
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .title {
    font-size: 50px;
  }
}
</style>
