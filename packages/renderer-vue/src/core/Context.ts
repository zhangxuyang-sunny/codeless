import { PlatformThis } from "@codeless/schema";

// 重写函数 this 指向为 context 对象
export class Context implements PlatformThis {
  currentThis: unknown = null;
  currentArguments: unknown[] = [];
  store: PlatformThis["store"] = {};

  setCurrentThis(current: typeof this.currentThis) {
    this.currentThis = current;
    return this;
  }

  setStore(name: string, store: PlatformThis["store"][string]) {
    this.store[name] = store;
    return this;
  }
}

export const context = new Context();
