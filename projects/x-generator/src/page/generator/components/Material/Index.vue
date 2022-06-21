<template>
  <div class="material-container">
    <header>
      <div class="title">组件库</div>
      <Search />
    </header>
    <div class="content">
      <RadioGroup type="button" v-model="contentType">
        <Radio value="installed">已安装</Radio>
        <Radio value="own">我的</Radio>
        <Radio value="collection">收藏</Radio>
      </RadioGroup>
      <component :is="Content" />
    </div>
    <div class="footer">
      <Commodity />
      <span>安装更多组件</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, Radio } from "@arco-design/web-vue";
import { Commodity } from "@icon-park/vue-next";
import Search from "./Search.vue";

import Collection from "./Collection.vue";
import Installed from "./Installed.vue";
import Own from "./Own.vue";
import { computed, ref } from "vue";

const contentType = ref<"installed" | "own" | "collection">("installed");

const Content = computed(() => {
  switch (contentType.value) {
    case "collection": {
      return Collection;
    }
    case "installed": {
      return Installed;
    }
    case "own": {
      return Own;
    }
    default: {
      return null;
    }
  }
});
</script>
<style lang="less" scoped>
.material-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
  }
  .content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .footer {
    margin-top: auto;
    border-top: 1px solid #eee;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 5px;
    .i-icon {
      font-size: 18px;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>
