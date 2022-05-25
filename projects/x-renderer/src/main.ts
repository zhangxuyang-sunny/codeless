import "./public-path";
import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";

import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes";
import { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";

addToImportMapImports(importMap);

createApp(App) //
  .use(routes)
  .mount("#app");

declare global {
  interface Window {
    __MICRO_APP_BASE_ROUTE__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_PUBLIC_PATH__: string;
  }
}
