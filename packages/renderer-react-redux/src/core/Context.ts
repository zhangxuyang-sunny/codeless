import { EnhancedStore } from "@reduxjs/toolkit";

export interface IContext {
  // TODO
  // 当前被调用函数的 this 指针
  // 例如 onClick 的 event 事件，在当前方法中可能不能拿到正确的 this
  current: null | unknown;
  store: {
    [name: string]: {
      state: Record<string, unknown>;
      methods: Record<string, (...args: unknown[]) => unknown>;
    };
  };
}

export class Context implements IContext {
  current = null;
  store: IContext["store"] = {};
  #store: EnhancedStore<Record<string, unknown>> | null = null;

  setStoreInstance(store: EnhancedStore<Record<string, unknown>>) {
    this.#store = store;
  }
  setStoreContext(store: IContext["store"]) {
    this.store = store;
  }
  getStoreContext() {
    return this.#store;
  }
}

export const context = new Context();
