import { PlatformThis } from "@codeless/schema";

type Package = typeof import("vue") | null;
type Stores = PlatformThis["stores"];

/**
 * 平台上下文对象
 * 用于绑定云函数的 this 指向
 */
export class Context {
  package: Package = null;
  stores: Stores = {
    states: {},
    actions: {}
  };

  setPackage(vue: typeof import("vue")) {
    this.package = vue;
    return this;
  }

  setState(name: string, state: Stores["states"][string]) {
    this.stores.states[name] = state;
    return this;
  }

  setAction(name: string, action: Stores["actions"][string]) {
    this.stores.actions[name] = action;
    return this;
  }

  getContext(
    resetCurrentOptions: Pick<PlatformThis, "currentArguments" | "currentThis">
  ): PlatformThis<Package> {
    return {
      framework: "vue",
      package: this.package,
      stores: this.stores,
      ...resetCurrentOptions
    };
  }
}

export const context = new Context();
