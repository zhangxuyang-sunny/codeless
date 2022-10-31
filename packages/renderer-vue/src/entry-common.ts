import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";
import "@economizer/types/src/renderer-api";

import { addToImportMapImports } from "packages/shared/src";

window.__X_RENDERER_API__ = {
  document,
  updateRoute() {
    console.warn("render is not initialized");
  },
  updateSchema() {
    console.warn("render is not initialized");
  }
};

declare global {
  interface Window {
    pinia: typeof import("pinia");
    vue: typeof import("vue");
    vueRouter: typeof import("vue-router");
  }
}

const host = process.env.NODE_ENV !== "production" ? "127.0.0.1:7890" : "119.91.65.70:7890";
const importMap = {
  "vue": `//${host}/static/packages/vue/index.js`,
  "pinia": `//${host}/static/packages/pinia.js`,
  "vue-router": `//${host}/static/packages/vue-router.js`,
  "@arco-design/web-vue": `//${host}/static/packages/@arco-design/web-vue.js`,
  "RendererEntry": `//${host}/static/components/common/RendererEntry.js`
  // "sortablejs": "http://localhost:8080/x-generator-render/sortablejs.js"
};

addToImportMapImports(importMap);
