import type { ComponentInternalInstance } from 'vue';
import type mitt from 'mitt';

export type TypeGlobalProperties = {
  $events: ReturnType<typeof mitt>;
  $refs: Map<string, ComponentInternalInstance>;
  $utils: {
    getKey: () => string;
    getInstance: () => ComponentInternalInstance | null;
  };
};
