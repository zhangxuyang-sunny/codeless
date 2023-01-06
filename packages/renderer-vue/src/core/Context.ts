import { PlatformThis } from "@codeless/schema";

type Package = typeof import("vue") | null;
type Stores = PlatformThis["stores"];

// 单例模式
function singleton<T extends new (...args: unknown[]) => unknown>(Class: T) {
  const map = new Map();
  return new Proxy(Class, {
    construct(target, args) {
      if (!map.has(Class)) {
        map.set(Class, new target(...args));
      }
      return map.get(Class);
    }
  });
}

/**
 * 平台上下文对象
 * 用于绑定云函数的 this 指向
 */
class Context {
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
    resetCurrentOptions: Pick<
      PlatformThis,
      | "currentThis" //
      | "invokerThis"
      | "invokerArguments"
    >
  ): PlatformThis<Package> {
    return {
      framework: "vue",
      package: this.package,
      stores: this.stores,
      ...resetCurrentOptions
    };
  }
}

const SingletonContext = singleton(Context);

export { SingletonContext as Context };
