import { createApp } from "vue";

import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";

import { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";

addToImportMapImports(importMap);

import App from "./App.vue";
createApp(App).mount("#app");
