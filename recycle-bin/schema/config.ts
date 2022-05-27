import type { DefineStoreOptions, StateTree } from "pinia";
import type { TypeMaterialConfig } from "./material";

// // 路由描述
// export type TypeRouterSchema = IObject<
//   {
//     mode: TypeString<"hash" | "history">;
//     routes: IArray<
//       IObject<{
//         name: TypeString;
//         path: TypeString;
//         page: TypePage | TypePageLink;
//       }>
//     >;
//   },
//   TypeRouterConfig
// >;

// // 资料库描述
// export type TypePiniaSchema = IObject<
//   {
//     state: IObject;
//     getters: IObject<Record<PropertyKey, TypeFunction>>;
//     actions: IObject<Record<PropertyKey, TypeFunction>>;
//   },
//   TypePiniaConfig
// >;

// // 页面描述
// export type TypePageSchema = IObject<
//   Record<keyof TypeMaterialConfig, TypeValueSchema>,
//   TypePageConfig
// >;

// // 单页面描述
// export type TypeSinglePageProjectSchema = {
//   type: "SinglePage";
//   pinia: TypePinia[];
//   page: TypePage;
// };

// pinia 配置
type TypePiniaDefineOptions = DefineStoreOptions<
  string,
  StateTree,
  Record<string, unknown>,
  Record<string, unknown>
>;
export type TypePiniaConfig = {
  id: string;
  state: Record<string, unknown>;
  getters: Record<string, unknown>;
  actions: Record<string, unknown>;
  // state: StateTree;
  // getters: TypePiniaDefineOptions["getters"];
  // actions: TypePiniaDefineOptions["actions"];
  // hydrate?: TypePiniaDefineOptions["hydrate"];
};

// 页面配置（等同于物料配置）
export type TypePageConfig = {
  id: string;
  title: string;
  config: TypeMaterialConfig;
};

// 路由配置
export type TypeRouterConfig = {
  mode: "hash" | "history";
  routes: Array<{
    name: string;
    path: string;
    page: TypePageConfig | null;
  }>;
};

// pinia 实例
export type TypePiniaStore = ReturnType<ReturnType<typeof import("pinia")["defineStore"]>>;
