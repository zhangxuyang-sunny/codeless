import "./entry-common";
import { createApp } from "vue";
import Simulator from "./views/simulator.vue";
import { createPinia } from "pinia";

createApp(Simulator).use(createPinia()).mount("#app");
