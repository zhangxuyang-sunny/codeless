import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";

import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes";
import { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";
import type { PageSchema } from "packages/x-nodes/nodes/PageNode";
import type { ProjectSchema } from "packages/x-nodes/nodes/ProjectNode";

addToImportMapImports(importMap);

createApp(App) //
  .use(routes)
  .mount("#app");

declare global {
  interface Window {
    // 渲染器对外暴露 api
    __X_RENDERER_API__: {
      document: Document;
      // 渲染器可渲染单页面和整个工程页面
      updateSchema: (schema: PageSchema | ProjectSchema) => Promise<void>;
      onMounted: (fn: () => void) => void;
    };
  }
}
