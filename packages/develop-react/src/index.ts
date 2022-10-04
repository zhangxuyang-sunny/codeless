export { useEvents } from "./core/hooks/useEvents";
export * from "./core/hooks/useGlobalProperties";

// 依赖
export type Dependencies = {
  react: typeof import("react");
  reactDOM: typeof import("react-dom");
};
