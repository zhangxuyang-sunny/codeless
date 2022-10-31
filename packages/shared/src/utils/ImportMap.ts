import "systemjs";

// https://github.com/systemjs/systemjs/blob/main/docs/import-maps.md
type TypeImportMap = {
  imports: Record<string, string>;
  scopes?: Record<`/${string}/`, Record<string, string>>;
  depcache?: Record<`/${string}`, string[]>;
  integrity?: Record<`/${string}`, string>;
};

const SCRIPT_TYPE = "systemjs-importmap";

// 获取所有 importMap script 标签
function getImportMapScripts() {
  return Array.from(document.head.getElementsByTagName("script")).filter(el => {
    return el instanceof HTMLScriptElement && el.type === SCRIPT_TYPE;
  });
}

// 创建一个 importMap 节点
export function createImportMapScript(data?: TypeImportMap) {
  const script = document.createElement("script");
  script.setAttribute("type", SCRIPT_TYPE);
  const importMap: TypeImportMap = data || { imports: {} };
  script.innerHTML = JSON.stringify(importMap, null, 2);
  document.head.appendChild(script);
}

// 向 imports 中添加一条数据
export function addToImportMapImports(imports: Record<string, string>) {
  const scriptList = getImportMapScripts();
  const firstEl = scriptList[0];
  const map: TypeImportMap = JSON.parse(firstEl?.innerText || "{}");
  if (!map.imports) map.imports = {};
  Object.assign(map.imports, imports);
  firstEl?.remove();
  createImportMapScript(map);
}

// TODO
// export function addToImportMapScopes() {}
// export function addToImportMapDepcache() {}
// export function addToImportMapIntegrity() {}
// 删除 imports 中的一条数据
// export function deleteFromImportMapImports(key: string) {}


// if (process.env.NODE_ENV === "development") {
//   const vue = await import("vue");
//   console.log(vue);
//   System.register("vue", [], (exportFn) => {
//     return {
//       setters: [],
//       execute: () => {
//         exportFn(vue);
//       },
//     };
//   });
// } else {
//   Object.assign(importMap, { vue: "http://127.0.0.1:7890/dist/lib/vue.js" });
// }

// export default class ImportMap {
//   static get<T extends System.Module>(key: keyof typeof importMap): T {
//     const map = Object.entries(importMap) //
//       .reduce<Record<string, string>>((prev, [key, url]) => {
//         prev[key] = url;
//         prev[url] = url;
//         return prev;
//       }, {});
//     const result = System.get<T>(key) || System.get<T>(map[key]);
//     if (!result) throw new Error(`[System.get] cannot find '${key}'`);
//     return result;
//   }
// }
