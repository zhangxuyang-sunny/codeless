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
    const vid = uuid().split("-")[0];
    addRouterView({ vid, title: "未命名页面", path: `/${vid}` });
  };

  // 删除一个路由页面
  const deleteRouterView = (vid: string) => {
    setRouterState({
      ...routerSchema,
      views: routerSchema.views.filter(view => view.vid !== vid)
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
