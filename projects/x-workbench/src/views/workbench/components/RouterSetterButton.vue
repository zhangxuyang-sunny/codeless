<script lang="ts" setup>
import { ref } from "vue";
import { Drawer } from "@arco-design/web-vue";
import { SettingConfig } from "@icon-park/vue-next";
import { useRouterConfig } from "@/stores/modules/workbench";
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
    <SettingConfig class="setting" theme="outline" @click="drawerVisible = true" />
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
.setting {
  cursor: pointer;
  display: inline-flex;
  height: 100%;
  padding: 6px;
  margin: 4px;
  font-size: 16px;
  color: var(--color-text-2);
  &:hover {
    background-color: var(--color-border-2);
    border-radius: 50%;
  }
}
</style>
