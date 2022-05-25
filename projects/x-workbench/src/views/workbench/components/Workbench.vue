<script lang="tsx" setup>
// import { reactive } from "vue";
// import { defineStore } from "pinia";
// import MaterialDragger from "./MaterialDragger.vue";
import MaterialOptions from "./MaterielOptions/Index.vue";
// import MaterialBuiltin from "./MaterialBuiltin.vue";
import WorkbenchPartsBar from "./WorkbenchPartsBar/Index.vue";
// import WorkbenchSidebar from "./WorkbenchSidebar/Index.vue";
// import MaterialSelector from "./MaterialSelector.vue";
// 编辑器根组件
// import Toolbar from "@/components/Toolbar.vue";

// import Renderer from "../../renderer/Index.vue";
// import projectSchema from "./schema";
// import PageEditor from "@/editor/Root.vue";

// 编辑器根组件
</script>

<template>
  <div class="editor-layout">
    <div class="workbench">
      <section class="left">
        <WorkbenchPartsBar />
      </section>
      <!-- <section class="block-layout left">
        <MaterialBuiltin />
        <MaterialSelector :list="list" />
      </section>
      <section class="block-layout center">
        <MaterialDragger />
      </section> -->
      <section class="center">
        <!-- <PageEditor /> -->
      </section>
      <section class="block-layout right">
        <MaterialOptions />
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .tools-bar {
    flex-shrink: 0;
    padding: 10px;
    overflow: hidden;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border-2);
  }
  .workbench {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
  }
  .block-layout {
    padding: 10px;
    overflow: hidden;
    background-color: var(--color-bg-2);
    border-right: 1px solid var(--color-border-2);
  }
  // 左边自动撑开，强制不压缩
  .left {
    flex-shrink: 0;
    overflow: hidden;
    border-right: 1px solid var(--color-border-1);
  }
  // 中间画布的宽度是动态的
  .center {
    flex-grow: 1;
    overflow: auto;
  }
  .right {
    width: 380px;
    flex-shrink: 0;
    overflow: hidden;
    border-left: 1px solid var(--color-border-1);
  }
}
</style>
