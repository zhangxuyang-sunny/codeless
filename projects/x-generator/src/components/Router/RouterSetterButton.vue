<script lang="ts" setup>
import { ref } from "vue";
import { Drawer, Button } from "@arco-design/web-vue";
import { Router } from "@icon-park/vue-next";
import { useRouterConfig } from "@low/generator/src/store/index";
import RouterSetter from "./RouterSetter.vue";

const drawerVisible = ref(false);
const {
  routerMode, //
  pageSchemaList,
  addPage,
  delPage,
  setRouterMode
} = useRouterConfig();
</script>

<template>
  <div class="router-setter-drawer">
    <Button @click="drawerVisible = true">
      <Router theme="outline" />
    </Button>
    <Drawer
      placement="left"
      width="600px"
      :visible="drawerVisible"
      @ok="drawerVisible = false"
      @cancel="drawerVisible = false"
    >
      <template #title>页面路由</template>
      <RouterSetter
        :router-mode="routerMode"
        :page-list="pageSchemaList"
        @add="addPage()"
        @delete="id => delPage(id)"
        @update:router-mode="mode => setRouterMode(mode)"
      />
    </Drawer>
  </div>
</template>

<style lang="less" scoped>
.router-setter-drawer {
  display: inline-flex;
  align-items: center;
}
// .setting {
//   cursor: pointer;
//   display: inline-flex;
//   height: 100%;
//   padding: 6px;
//   margin: 4px;
//   font-size: 16px;
//   color: var(--color-text-2);
//   &:hover {
//     background-color: var(--color-border-2);
//     border-radius: 50%;
//   }
// }
</style>
