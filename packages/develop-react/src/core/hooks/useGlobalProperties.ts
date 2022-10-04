import type { ComponentInternalInstance } from "vue";
import { inject } from "vue";
import EventEmitter2 from "eventemitter2";

export type ExtendsMethods = {
  onSelf: EventEmitter2["on"];
  emitSelf: EventEmitter2["emit"];
};

export type GlobalProperties = {
  $events: EventEmitter2;
  $refs: Map<string, ComponentInternalInstance>;
  $utils: {
    getComponentId: () => string | null;
    getInstance: () => ComponentInternalInstance | null;
  };
};

export default function useGlobalProperties() {
  return inject<GlobalProperties>("globalProperties");
}

export { useGlobalProperties };
