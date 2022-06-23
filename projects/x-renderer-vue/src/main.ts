import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";

import { createApp } from "vue";
import App from "./App.vue";
import { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";
import type { PageSchema, ProjectSchema } from "packages/x-nodes/dist";

declare global {
  interface Window {
    // 渲染器对外暴露 api
    __X_RENDERER_API__: {
      document: Document;
      // 渲染器可渲染单页面和整个工程页面
      updateCurrentRoute: (vid: string) => void;
      updateProjectSchema: (projectSchema: ProjectSchema) => void;
      updatePageSchemaList: (pageSchema: PageSchema[]) => void;
    };
    pinia: typeof import("pinia");
    vue: typeof import("vue");
    vueRouter: typeof import("vue-router");
  }
}

addToImportMapImports(importMap);

window.__X_RENDERER_API__ = {
  document,
  updateCurrentRoute() {
    console.warn("render is not initialized");
  },
  updateProjectSchema() {
    console.warn("render is not initialized");
  },
  updatePageSchemaList() {
    console.warn("render is not initialized");
  }
};

createApp(App).mount("#app");
