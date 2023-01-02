import { PlatformThis } from "@codeless/schema";

type Package = typeof import("vue") | null;

/**
 * 平台上下文对象
 * 用于绑定云函数的 this 指向
 */
export class Context {
  package: Package = null;
  store: PlatformThis["store"] = {};

  setPackage(vue: typeof import("vue")) {
    this.package = vue;
    return this;
  }

  setStore(name: string, store: PlatformThis["store"][string]) {
    this.store[name] = store;
    return this;
  }

  getContext(
    resetCurrentOptions: Pick<PlatformThis, "currentArguments" | "currentThis">
  ): PlatformThis<Package> {
    return {
      framework: "vue",
      package: this.package,
      store: this.store,
      ...resetCurrentOptions
    };
  }
}

export const context = new Context();
