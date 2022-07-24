import { v4 as uuid } from "uuid";
import { atom, useRecoilState } from "recoil";
import { PageConfig, ProjectConfig, RouterConfig } from "packages/x-core/dist/types/manager";

export const projectState = atom<ProjectConfig>({
  key: "project",
  default: {
    router: {
      base: "/",
      mode: "hash",
      meta: {}
    },
    pages: [],
    datasets: []
  }
});

export function useProjectConfig() {
  const [projectConfig, setProjectConfig] = useRecoilState(projectState);

  // 设置路由模式
  const setRouterMode = (mode: RouterConfig["mode"]) => {
    setProjectConfig({
      ...projectConfig,
      router: {
        ...projectConfig.router,
        mode
      }
    });
  };

  // 添加一个路由页面
  const addPage = (page: PageConfig) => {
    setProjectConfig({
      ...projectConfig,
      pages: [...projectConfig.pages, page]
    });
  };

  // 创建一个新页面并追加到页面列表
  const createPage = () => {
    const id = uuid().split("-")[0];
    addPage({
      id,
      title: "未命名页面",
      name: id,
      path: `/${id}`,
      component: { id, version: "0.0.0" }
    });
  };

  // 删除一个路由页面
  const deletePage = (id: string) => {
    setProjectConfig({
      ...projectConfig,
      pages: projectConfig.pages.filter(page => page.id !== id)
    });
  };

  return {
    projectConfig,
    setRouterMode,
    addPage,
    createPage,
    deletePage
  };
}
