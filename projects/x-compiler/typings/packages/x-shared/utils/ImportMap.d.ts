import "systemjs";
declare type TypeImportMap = {
    imports: Record<string, string>;
    scopes?: Record<`/${string}/`, Record<string, string>>;
    depcache?: Record<`/${string}`, string[]>;
    integrity?: Record<`/${string}`, string>;
};
export declare function createImportMapScript(data?: TypeImportMap): void;
export declare function addToImportMapImports(imports: Record<string, string>): void;
export declare const host: string;
export declare const importMap: {
    vue: string;
    pinia: string;
    "vue-router": string;
    "@arco-design/web-vue": string;
    RendererEntry: string;
};
export default class ImportMap {
    static get<T extends System.Module>(key: keyof typeof importMap): T;
}
export {};
