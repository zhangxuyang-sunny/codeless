import { v4 as uuid } from "uuid";
import { atom, useRecoilState } from "recoil";
import { IRouterOption, IViewOption } from "packages/x-core/dist/types/project";

export const routerState = atom<IRouterOption>({
  key: "router-schema",
  default: {
    base: "",
    mode: "hash",
    views: []
  }
});

// 操作 routerSchema
export function useRouterSchema() {
  const [routerSchema, setRouterState] = useRecoilState(routerState);

  // 设置路由模式
  const setRouterMode = (mode: IRouterOption["mode"]) => {
    setRouterState({
      ...routerSchema,
      mode
    });
  };

  // 添加一个路由页面
  const addRouterView = (view: IViewOption) => {
    setRouterState({
      ...routerSchema,
      views: [...routerSchema.views, view]
    });
  };

  // 创建一个新页面并追加到页面列表
  const createRouterView = () => {
    const viewId = uuid().split("-")[0];
    addRouterView({ viewId, title: "未命名页面", urlPath: `/${viewId}` });
  };

  // 删除一个路由页面
  const deleteRouterView = (viewId: string) => {
    setRouterState({
      ...routerSchema,
      views: routerSchema.views.filter(view => view.viewId !== viewId)
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
