import { SidebarConfig } from "vuepress";

export const sidebarZh: SidebarConfig = {
  "/guide/": [
    {
      text: "指南",
      children: [
        "/guide/index.md"
      ]
    }
  ],
  "/reference/": [
    {
      text: "参考",
      children: []
    }
  ]
}
