import { v4 as uuid } from "uuid";
import { atom, useRecoilState } from "recoil";
import {
  type Application,
  type RouterMode,
  type Page,
  ApplicationBuilder,
  ComponentSchemaBuilder
} from "@codeless/schema";

export const projectState = atom<{
  schema: Application;
}>({
  key: "project",
  default: {
    schema: new ApplicationBuilder().end()
  }
});

export function useProject() {
  const [project, setProject] = useRecoilState(projectState);

  // 设置路由模式
  const setRouterMode = (mode: RouterMode) => {
    setProject({
      ...project,
      schema: new ApplicationBuilder(project.schema).setRouterMode(mode).end()
    });
  };

  // 添加一个路由页面
  const addPage = (page: Page) => {
    setProject({
      ...project,
      schema: {
        ...project.schema,
        pages: [...project.schema.pages, page]
      }
    });
  };

  // 创建一个新页面并追加到页面列表
  const createPage = () => {
    const id = uuid().split("-")[0];
    addPage({
      meta: {
        title: "未命名页面"
      },
      path: `/${id}`,
      component: new ComponentSchemaBuilder().setId(id).end()
    });
  };

  // 删除一个路由页面
  const deletePage = (index: number) => {
    setProject({
      ...project,
      schema: {
        ...project.schema,
        pages: project.schema.pages.filter((_, i) => index !== i)
      }
    });
  };

  return {
    project,
    setRouterMode,
    addPage,
    createPage,
    deletePage
  };
}
