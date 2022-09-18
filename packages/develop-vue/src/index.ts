export { useEvents } from "./core/hooks/useEvents";
export * from "./core/hooks/useGlobalProperties";

// 依赖
export type Dependencies = {
  vue: typeof import("vue");
  vueRouter: typeof import("vue-router");
  pinia: typeof import("pinia");
};
