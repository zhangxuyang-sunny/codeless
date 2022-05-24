<template>
  <Spin :loading="loading" tip="数据加载中">
    <div class="generator-container">
      <HeaderVue />
      <div class="main">
        <div class="left">
          <Sidebar />
        </div>
        <div class="widget-edit-container">
          <Simulator />
        </div>
        <div class="right">
          <PropsVue />
        </div>
      </div>
    </div>
  </Spin>
</template>
<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { ref } from "vue";
import { Spin } from "@arco-design/web-vue";
import { PageNode, PageSchema } from "packages/x-nodes/index";
import { usePageConfig, useRouterConfig } from "./store";
import Sidebar from "./components/Sidebar/Index.vue";
import HeaderVue from "./components/Header/Index.vue";
import PropsVue from "./components/Props/Index.vue";
// import Emulator from "./components/Emulator.vue";
import Simulator from "projects/x-workbench/src/views/simulator/Index.vue";
const loading = ref(true);
const { initRouterConfig } = useRouterConfig();
const { initPageConfig } = usePageConfig();

function getData(): Promise<PageSchema[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const pages = [
        new PageNode().setTitle("首页").setUrlPath("/").setId(uuid().substring(0, 8)).getSchema(),
        new PageNode()
          .setTitle("详情页")
          .setUrlPath("/detail")
          .setId(uuid().substring(0, 8))
          .getSchema()
      ];
      resolve(pages);
    }, 1000);
  });
}

getData().then(res => {
  initRouterConfig(res);
  initPageConfig(res[0]);

  loading.value = false;
});
</script>
<style lang="less">
.i-icon {
  line-height: 0.5px;
}
</style>
<style lang="less" scoped>
.generator-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    padding: 6px;
    display: flex;
    .widget-edit-container {
      flex: 1;
    }
    .left,
    .right {
      display: flex;
      overflow: hidden;
      grid-column-gap: 6px;
    }
  }
}
</style>
