import { createRouter, createWebHistory } from "vue-router";

const baseUrl = window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL || "/";
console.log(baseUrl, window.__MICRO_APP_BASE_ROUTE__, process.env.BASE_URL);

export default createRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  history: createWebHistory(baseUrl),
  routes: [
    {
      // 首页
      path: "/",
      name: "home",
      component: () => import("./Container.vue")
    },
    {
      path: "/:pathMatch(.*)",
      redirect: baseUrl
    }
  ]
});
