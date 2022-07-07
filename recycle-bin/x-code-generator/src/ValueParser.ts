import type { TypePiniaConfig, TypePiniaStore } from "../../x-types/src/schema/config";
import type { TypeValueSchema } from "../../x-types/src/schema/value";
import type { TypeMaterialConfig } from "../../x-types/src/material";

import mapToRecord from "../../x-shared/mapToRecord";
import {
  ValueBigInt,
  ValueBoolean,
  ValueNumber,
  ValueRegExp,
  ValueRouter,
  ValueString,
  ValueSymbol
} from "./ValueGenerator";

export type TypePackages = {
  vue: typeof import("vue");
  pinia: typeof import("pinia");
  vueRouter: typeof import("vue-router");
};

// schema 解析器
export default class ValueParser {
  // private EntryComponent: DefineComponent<{ data: TypeMaterialConfig }>;
  private piniaConfigMap = new Map<PropertyKey, TypePiniaConfig>();
  private piniaStoreMap = new Map<string, TypePiniaStore>();
  private pageConfigMap = new Map<string, TypeMaterialConfig>();
  private PageComponentMap = new Map<string, TypePage["$$"]>();
  private get context(): {
    piniaRecord: Record<string, TypePiniaStore>;
  } {
    return {
      piniaRecord: mapToRecord(this.piniaStoreMap)
    };
  }
  // 数据生成器
  parseValue<T extends TypeValueSchema>(schema: T): Required<T>["$$"] {
    const { type } = schema;
    schema = { ...schema };
    switch (type) {
      case "Number": {
        const { value } = new ValueNumber(schema.initial);
        schema.$$ = value;
        break;
      }
      case "String": {
        const { value } = new ValueString(schema.initial);
        schema.$$ = value;
        break;
      }
      case "Boolean": {
        const { value } = new ValueBoolean(schema.initial);
        schema.$$ = value;
        break;
      }
      case "RegExp": {
        const { value } = new ValueRegExp(schema.pattern, schema.flag);
        schema.$$ = value;
        break;
      }
      case "Symbol": {
        const { value } = new ValueSymbol(schema.description);
        schema.$$ = value;
        break;
      }
      case "BigInt": {
        const { value } = new ValueBigInt(schema.value);
        schema.$$ = value;
        break;
      }
      case "Array": {
        schema.$$ = schema.elements.map(item => this.parseValue(item));
        break;
      }
      case "Object": {
        const { properties } = schema;
        schema.$$ = Object.entries(properties) //
          .reduce<Record<PropertyKey, T["$$"]>>((prev, [key, property]) => {
            prev[key] = this.parseValue(property);
            return prev;
          }, {});
        break;
      }
      case "Function": {
        schema.$$ = new Function("$this", ` return ${schema.code}`).call(this, this.context);
        break;
      }
      case "Map": {
        const value = new Map<PropertyKey, T["$$"]>();
        schema.iterable.forEach(([key, valueSchema]) => {
          return value.set(key, this.parseValue(valueSchema));
        });
        schema.$$ = value;
        break;
      }
      case "Set": {
        const arrayLike = this.parseValue<IArray>({
          type: "Array",
          elements: schema.elements
        });
        schema.$$ = new Set(arrayLike instanceof Array ? arrayLike : []);
        break;
      }
      case "WeakMap": {
        schema.$$ = new WeakMap();
        break;
      }
      case "WeakSet": {
        schema.$$ = new WeakSet();
        break;
      }
      // TODO: Promise 类型考虑用 async Function 实现，
      case "Promise": {
        const { method } = schema;
        switch (method) {
          case "all":
          case "race": {
            schema.$$ = Promise.all(schema.values.map(Promise.resolve));
            break;
          }
          case "resolve":
          case "reject": {
            schema.$$ = Promise.resolve(this.parseValue(schema.value));
            break;
          }
        }
        break;
      }
      case "Null": {
        schema.$$ = null;
        break;
      }
      case "Undefined": {
        schema.$$ = undefined;
        break;
      }
      case "Router": {
        schema.$$ = new ValueRouter(schema.schema).value;
        // const {
        //   createRouter, //
        //   createWebHistory,
        //   createWebHashHistory
        // } = vueRouter;
        // const config = this.parseValue(schema.schema);
        // if (!config) {
        //   console.warn(`[Router]: 路由配置解析失败`, schema);
        //   schema.$$ = null;
        //   break;
        // }
        // const { mode, routes } = config;
        // const routerInstance = createRouter({
        //   // 路由模式
        //   history:
        //     mode === "hash" //
        //       ? createWebHashHistory()
        //       : createWebHistory(),
        //   // 路由列表
        //   routes: routes.flatMap(item => {
        //     let c;
        //     if (typeof item.page === "string") {
        //       c = this.PageComponentMap.get(item.page);
        //     } else {
        //       c = item.page;
        //     }
        //     if (!c) {
        //       console.warn(`[Router]: 解析失败`, item);
        //       return [];
        //     }
        //     const component = vue.h(c);
        //     return [{ ...item, component }];
        //   })
        // });
        // schema.$$ = routerInstance;
        break;
      }
      // case "ReactiveByPinia": {
      //   if (this.piniaStoreMap.size === 0) {
      //     console.warn(`没有可用的 piniaStore`);
      //     schema.$$ = null;
      //   }
      //   const { path } = schema;
      //   schema.$$ = vue.computed(() => {
      //     const toRecord = mapToRecord(this.piniaStoreMap);
      //     return lodashGet(toRecord, path);
      //   });
      //   break;
      // }
      case "Pinia": {
        // 数据集解析
        const piniaConfig = this.parseValue(schema.schema);

        if (!piniaConfig) {
          console.warn(`[Pinia]: 配置解析失败`, schema);
          break;
        }
        if (!piniaConfig.state) {
          console.warn(`[Pinia]: 未定义 state`, schema);
          break;
        }
        schema.$$ = piniaConfig;
        break;
      }
      // case "PiniaLink": {
      //   schema.$$ = this.piniaStoreMap.get(schema.key);
      //   break;
      // }
      // case "Page": {
      //   const config = this.parseValue(schema.schema);
      //   if (!config) {
      //     console.warn(`[Page]: 配置解析失败`, schema);
      //     break;
      //   }
      //   const { EntryComponent } = this;
      //   const Component = vue.defineComponent({
      //     render() {
      //       return vue.h(EntryComponent, { data: config });
      //     }
      //   });
      //   schema.$$ = Component;
      //   break;
      // }
      // case "PageLink": {
      //   if (this.PageComponentMap.size === 0) {
      //     console.warn("无页面配置数据");
      //     schema.$$ = null;
      //     break;
      //   }
      //   const Component = this.PageComponentMap.get(schema.key);
      //   if (!Component) {
      //     console.warn(`未找到页面配置：'${schema.key}'`);
      //     schema.$$ = null;
      //     break;
      //   }
      //   schema.$$ = Component;
      //   break;
      // }
      // case "Unknown":
      // default: {
      //   schema.$$ = `Unknown Type: ${schema.type}`;
      //   break;
      // }
    }
    return schema.$$;
  }

  // 解析 pinia 数据集
  // private parsePiniaList(piniaSchemaList: TypePinia[]) {
  //   // 数据集解析
  //   piniaSchemaList.forEach(schema => {
  //     const piniaConfig = this.parseValue(schema);

  //     if (!piniaConfig) {
  //       console.warn(`[Pinia]: "${schema.key}" 配置解析出错`);
  //       return;
  //     }
  //     if (!piniaConfig.state) {
  //       console.warn(`[Pinia]: "${schema.key}" 未定义 state`);
  //       return;
  //     }

  //     const piniaStore = this.packages.pinia.defineStore(schema.key, {
  //       ...piniaConfig,
  //       state: () => piniaConfig.state
  //     })();
  //     this.piniaConfigMap.set(schema.key, piniaConfig);
  //     this.piniaStoreMap.set(schema.key, piniaStore);
  //   });
  // }

  // private parsePageList(pageSchemaList: TypePage[]) {
  //   pageSchemaList.forEach(schema => {
  //     const Component = this.parseValue(schema);
  //     if (!Component) return;
  //     this.PageComponentMap.set(schema.id, Component);
  //   });
  // }

  // // 创建多页工程
  // createMultiPageProject(schema: TypeMultiPageProjectSchema) {
  //   this.parsePiniaList(schema.pinia);
  //   this.parsePageList(schema.pages);
  //   const routerInstance = this.parseValue(schema.router);
  //   return {
  //     piniaStoreMap: this.piniaStoreMap,
  //     PageComponentMap: this.PageComponentMap,
  //     routerInstance
  //   };
  // }

  // // 创建单页应用
  // createSinglePageProject(schema: TypeSinglePageProjectSchema) {
  //   this.parsePiniaList(schema.pinia);
  //   const page = this.parseValue(schema.page);
  //   if (!page) return null;
  //   return {
  //     piniaStoreMap: this.piniaStoreMap,
  //     PageComponent: page.Component
  //   };
  // }
}
