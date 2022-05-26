import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";

createApp(App).use(createPinia()).mount("#app");
