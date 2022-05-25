import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";
import microApp from "@micro-zoe/micro-app";
import { createApp } from "vue";
import routes from "./routes/index";
import stores from "./stores/index";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
// import LowCodePlugin from './common/LowCodePlugin';
import ImportMap, { importMap, addToImportMapImports } from "packages/x-shared/utils/ImportMap";

microApp.start({ shadowDOM: true });
addToImportMapImports(importMap);

// 重写 System.get
System.get = ImportMap.get;

// 加载远程依赖
// const loadDeps = Object.entries(importMap) //
//   .map(async ([, url]) => {
//     const module = await System.import(url);
//     System.set(url, module);
//     return module;
//   });

// Promise.all(loadDeps).then(async () => {
const app = createApp(App);
// app.config.performance = true; // 打开后卡死
// app.config.errorHandler = (err, vm, info) => {
//   console.log(err, vm, info);
// };
app.use(routes);
app.use(stores);
// app.use(LowCodePlugin); // 注册低代码插件
app.mount("#app");
// });
