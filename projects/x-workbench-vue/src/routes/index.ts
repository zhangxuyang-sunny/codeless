import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      // 首页
      path: "/",
      name: "home",
      component: () => import("../views/home/Index.vue")
    },
    {
      // 工作区
      path: "/workbench",
      name: "workbench",
      component: () => import("../views/workbench/Index.vue")
    },
    {
      // 编辑器
      path: "/generator",
      name: "generator",
      component: () => import("../views/generator/Index.vue")
    },
    // 模拟器
    {
      path: "/simulator:page*",
      name: "simulator",
      component: () => import("../views/simulator/Index.vue")
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/"
    }
  ]
});
