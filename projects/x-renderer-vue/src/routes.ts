import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    // 渲染器
    {
      path: "/",
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
