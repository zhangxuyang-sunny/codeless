import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory("/renderer"),
  routes: [
    // 单页面渲染器
    {
      path: "/page",
      name: "page",
      component: () => import("./views/Page.vue")
    },
    // 项目渲染器
    {
      path: "/project",
      name: "project",
      component: () => import("./views/Project.vue")
    },
    // 空页面
    {
      path: "/empty",
      name: "empty",
      component: () => import("./views/Empty.vue")
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/empty"
    }
  ]
});
