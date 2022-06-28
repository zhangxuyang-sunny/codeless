import { v4 as uuid } from "uuid";
import { atom, useRecoilState } from "recoil";
import { ViewOption, RouterNode, RouterSchema } from "packages/x-nodes/dist/nodes/RouterNode";

export const routerSchemaState = atom<RouterSchema>({
  key: "router-schema",
  default: new RouterNode().getSchema()
});

// 操作 routerSchema
export function useRouterSchema() {
  const [routerSchema, setRouterState] = useRecoilState(routerSchemaState);

  // 设置路由模式
  const setRouterMode = (mode: RouterSchema["mode"]) => {
    setRouterState({
      ...routerSchema,
      mode
    });
  };

  // 添加一个路由页面
  const addRouterView = (view: ViewOption) => {
    setRouterState({
      ...routerSchema,
      views: [...routerSchema.views, view]
    });
  };

  // 创建一个新页面并追加到页面列表
  const createRouterView = () => {
    const pageId = uuid().split("-")[0];
    addRouterView({ pageId, title: "未命名页面", path: `/${pageId}` });
  };

  // 删除一个路由页面
  const deleteRouterView = (pageId: string) => {
    setRouterState({
      ...routerSchema,
      views: routerSchema.views.filter(view => view.pageId !== pageId)
    });
  };

  return {
    routerSchema,
    setRouterMode,
    addRouterView,
    createRouterView,
    deleteRouterView
  };
}
