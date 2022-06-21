import { v4 as uuid } from "uuid";
import { atom, useRecoilState } from "recoil";
import { PageConfig, RouterNode, RouterSchema } from "packages/x-nodes/dist/nodes/RouterNode";

export const routerState = atom<RouterSchema>({
  key: "router-schema",
  default: new RouterNode().getSchema()
});

// 操作 routerSchema
export function useRouterSchema() {
  const [routerSchema, setRouterState] = useRecoilState(routerState);

  // 设置路由模式
  const setRouterMode = (mode: RouterSchema["mode"]) => {
    setRouterState({
      ...routerSchema,
      mode
    });
  };

  // 添加一个路由页面
  const addRouterPage = (page: PageConfig) => {
    setRouterState({
      ...routerSchema,
      pages: [...routerSchema.pages, page]
    });
  };

  // 创建一个新页面并追加到页面列表
  const createRouterPage = () => {
    const id = uuid();
    addRouterPage({ id, title: "未命名页面", path: `/${id}` });
  };

  const deleteRouterPage = (id: string) => {
    setRouterState({
      ...routerSchema,
      pages: routerSchema.pages.filter(page => page.id !== id)
    });
  };

  return {
    routerSchema,
    setRouterMode,
    addRouterPage,
    createRouterPage,
    deleteRouterPage
  };
}
