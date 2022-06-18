import type { Emitter } from 'mitt';
import type { ComponentInternalInstance } from 'vue';

export type TypeGlobalProperties = {
  $events: Emitter<Record<string, unknown>>;
  $refs: Map<string, ComponentInternalInstance>;
  $utils: {
    getKey: () => string;
    getInstance: () => ComponentInternalInstance | null;
  };
};
