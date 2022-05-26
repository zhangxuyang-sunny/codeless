<template>
  <Spin :loading="loading" tip="数据加载中">
    <div class="generator-container">
      <HeaderVue />
      <div class="main">
        <div class="left">
          <Sidebar />
        </div>
        <div class="widget-edit-container">
          <iframe frameborder="0"></iframe>
          <!-- <Emulator /> -->
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
import { PageNode, PageSchema } from "packages/x-nodes";
import { usePageStore, useRouterConfig } from "./store";
import Sidebar from "./components/Sidebar/Index.vue";
import HeaderVue from "./components/Header/Index.vue";
import PropsVue from "./components/Props/Index.vue";

import project from "../../../../x-renderer/src/draft/schema";
const loading = ref(true);

const { initRouterConfig } = useRouterConfig();
const { initPageStore, $state } = usePageStore();

function getData(): Promise<PageSchema[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const pages = [
        new PageNode().setTitle("首页").setUrlPath("/").setId(uuid().substring(0, 8)).getSchema(),
        new PageNode()
          .setTitle("详情页")
          .setUrlPath("/detail")
          .setId(uuid().substring(0, 8))
          .setSchema(project.pageList[0])
          .getSchema()
      ];
      resolve(pages);
    }, 1000);
  });
}

getData().then(res => {
  initRouterConfig(res);
  initPageStore(res[1]);
  console.log($state);
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
  background-color: var(--color-border-1);
  .main {
    flex: 1;
    padding: 6px;
    display: flex;
    .widget-edit-container {
      flex: 1;
      margin: 0 6px;
      border-radius: 4px;
      background-color: var(--color-bg-2);
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
