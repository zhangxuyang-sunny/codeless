import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";

import type { IProjectSchema } from "packages/x-core/dist/types/project";
import type { IViewSchema } from "packages/x-core/dist/types/view";
import { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";

window.__X_RENDERER_API__ = {
  document,
  updateCurrentRoute() {
    console.warn("render is not initialized");
  },
  updateProject() {
    console.warn("render is not initialized");
  },
  updateViews() {
    console.warn("render is not initialized");
  }
};

declare global {
  interface Window {
    // 渲染器对外暴露 api
    __X_RENDERER_API__: {
      document: Document;
      // 渲染器可渲染单页面和整个工程页面
      updateCurrentRoute: (id: string) => void;
      updateProject: (schema: IProjectSchema) => void;
      updateViews: (schema: IViewSchema[]) => void;
    };
    pinia: typeof import("pinia");
    vue: typeof import("vue");
    vueRouter: typeof import("vue-router");
  }
}

addToImportMapImports(importMap);
