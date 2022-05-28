import type { Emitter } from 'mitt';
import type { ComponentInternalInstance } from 'vue';
export declare type TypeGlobalProperties = {
    $events: Emitter<Record<string, unknown>>;
    $refs: Map<string, ComponentInternalInstance>;
    $utils: {
        getKey: () => string;
        getInstance: () => ComponentInternalInstance | null;
    };
};
export declare type TypePackages = {
    vue: typeof import('vue');
    pinia: typeof import('pinia');
    vueRouter: typeof import('vue-router');
};
