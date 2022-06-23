import { TypeMaterialConfig } from "@low/types/material";
import type {
  TypeNumber,
  TypeString,
  TypeBoolean,
  TypeRegExp,
  TypeSymbol,
  TypeBigInt,
  IArray,
  IObject,
  TypeFunction,
  TypeSet,
  TypeMap,
  TypeWeakMap,
  TypeWeakSet,
  // TypePromise,
  TypeNull,
  TypeUndefined,
  // TypeUnknown,
  // TypeReactiveByPinia,
  TypeRouter,
  TypePinia,
  // TypePiniaLink,
  TypePage,
  // TypePageLink,
  TypeMultiPage,
  TypeValueSchema
} from "@low/types/schema/value";
import type { TypePiniaStore } from "@low/types/schema/config";

abstract class Value<T extends TypeValueSchema, R> {
  protected $schema: Partial<T> = {};
  constructor(type: T["type"]);
  constructor(schema: T);
  constructor(typeOrSchema: T["type"] | T) {
    if (typeof typeOrSchema === "string") {
      this.$schema.type = typeOrSchema;
    } else {
      this.setSchema(typeOrSchema);
    }
  }

  // 强制更改 type
  // 危险操作，不要使用
  forceSetType(type: T["type"]) {
    this.$schema.type = type;
  }

  setSchema(schema: T) {
    this.$schema = schema;
    return this;
  }

  get schema(): T {
    return <T>this.$schema;
  }

  // 生成 value
  abstract get value(): R;

  parseValue<V extends TypeValueSchema>(schema: V): Required<V>["$$"] {
    const { type } = schema;
    schema = { ...schema };
    switch (type) {
      case "Number": {
        schema.$$ = new ValueNumber(schema.initial).value;
        break;
      }
      case "String": {
        schema.$$ = new ValueString(schema.initial).value;
        break;
      }
      case "Boolean": {
        schema.$$ = new ValueBoolean(schema.initial).value;
        break;
      }
      case "RegExp": {
        schema.$$ = new ValueRegExp(schema.pattern, schema.flag).value;
        break;
      }
      case "Symbol": {
        schema.$$ = new ValueSymbol(schema.description).value;
        break;
      }
      case "BigInt": {
        schema.$$ = new ValueBigInt(schema.value).value;
        break;
      }
      case "Array": {
        schema.$$ = new ValueArray().value;
        break;
      }
      case "Object": {
        schema.$$ = new ValueObject().value;
        break;
      }
      case "Function": {
        schema.$$ = new ValueFunction(schema.code, {
          piniaRecord: {}
        }).value;
        break;
      }
      case "Map": {
        schema.$$ = new ValueMap(schema.iterable).value;
        break;
      }
      case "Set": {
        schema.$$ = new ValueSet(schema.elements).value;
        break;
      }
      case "WeakMap": {
        schema.$$ = new ValueWeakMap().value;
        break;
      }
      case "WeakSet": {
        schema.$$ = new ValueWeakSet().value;
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
        schema.$$ = new ValueRouter(schema).value;
        break;
      }
      case "Unknown":
      default: {
        schema.$$ = `Unknown Type: ${schema.type}`;
        break;
      }
      // TODO: Promise 类型考虑用 async Function 实现，
      // case "Promise": {
      //   const { method } = schema;
      //   switch (method) {
      //     case "all":
      //     case "race": {
      //       schema.$$ = Promise.all(schema.values.map(Promise.resolve));
      //       break;
      //     }
      //     case "resolve":
      //     case "reject": {
      //       schema.$$ = Promise.resolve(this.parseValue(schema.value));
      //       break;
      //     }
      //   }
      //   break;
      // }
      // case "Router": {
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
      // break;
      // }
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
      // case "Pinia": {
      //   // 数据集解析
      //   const piniaConfig = this.parseValue(schema.schema);

      //   if (!piniaConfig) {
      //     console.warn(`[Pinia]: 配置解析失败`, schema);
      //     break;
      //   }
      //   if (!piniaConfig.state) {
      //     console.warn(`[Pinia]: 未定义 state`, schema);
      //     break;
      //   }
      //   schema.$$ = piniaConfig;
      //   break;
      // }
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
    }
    return schema.$$;
  }
}

export class ValueString extends Value<TypeString, string> {
  constructor(initial = "") {
    super("String");
    this.$schema.initial = initial;
  }
  setValue(val: string) {
    this.$schema.initial = val;
    return this;
  }
  get value() {
    return super.schema.initial;
  }
}

export class ValueNumber extends Value<TypeNumber, number> {
  constructor(initial = 0) {
    super("Number");
    this.$schema.initial = initial;
  }
  setValue(val: number) {
    this.$schema.initial = val;
    return this;
  }
  get value() {
    return this.schema.initial;
  }
}

type a = ValueNumber["value"];

export class ValueBoolean<T extends TypeBoolean> extends Value<T> {
  constructor(initial = false) {
    super("Boolean");
    this.$schema.initial = initial;
  }
  setValue(val: T["initial"]) {
    this.$schema.initial = val;
    return this;
  }
  get value() {
    return this.schema.initial;
  }
}

export class ValueRegExp extends Value<TypeRegExp> {
  constructor(pattern?: TypeRegExp["pattern"], flag?: TypeRegExp["flag"]) {
    super("RegExp");
    this.$schema.pattern = pattern;
    this.$schema.flag = flag;
  }
  setPattern(pattern: TypeRegExp["pattern"]) {
    this.$schema.pattern = pattern;
    return this;
  }
  setFlag(flag: TypeRegExp["flag"]) {
    this.$schema.flag = flag;
    return this;
  }
  get value() {
    return new RegExp(super.schema.pattern, super.schema.flag);
  }
}

export class ValueSymbol extends Value<TypeSymbol> {
  constructor(description?: TypeSymbol["description"]) {
    super("Symbol");
    this.$schema.description = description;
  }
  setDescription(description: TypeSymbol["description"]) {
    this.$schema.description = description;
  }
  get value() {
    return Symbol(this.schema.description);
  }
}

export class ValueBigInt<T extends TypeBigInt> extends Value<T> {
  constructor(value: T["value"]) {
    super("BigInt");
    this.$schema.value = value;
  }
  setValue(val: T["value"]) {
    this.$schema.value = val;
    return this;
  }
  get value() {
    return BigInt(super.schema.value);
  }
}

export class ValueArray<T extends IArray> extends Value<T> {
  constructor(elements: T["elements"] = []) {
    super("Array");
    this.$schema.elements = elements;
  }
  setElements(elements: T["elements"]) {
    this.$schema.elements = elements;
    return this;
  }
  addElement(element: T["elements"][number]) {
    super.schema.elements.push(element);
    return this;
  }
  get value() {
    return super.schema.elements.map(element => this.parseValue(element));
  }
}

export class ValueObject extends Value<IObject, Record<string, unknown>> {
  constructor(schema?: IObject) {
    super("Object");
    if (schema) {
      this.$schema = schema;
    } else {
      this.$schema.properties = {};
    }
  }
  setProperty(key: string, value: TypeValueSchema) {
    if (!this.$schema.properties) {
      this.$schema.properties = {};
    }
    this.$schema.properties[key] = value;
    return this;
  }
  setProperties(properties: IObject["properties"]) {
    this.$schema.properties = properties;
    return this;
  }
  get value() {
    const { properties } = this.schema;
    const obj = Object.entries(properties) //
      .reduce<Record<string, TypeValueSchema["$$"]>>((prev, [key, property]) => {
        const config = this.parseValue(property);
        prev[key] = config;
        return prev;
      }, {});
    return obj;
  }
}

export class ValueFunction extends Value<TypeFunction> {
  constructor(
    code: string,
    private context: {
      piniaRecord: Record<string, TypePiniaStore>;
    }
  ) {
    super("Function");
    this.$schema.code = code;
  }
  get value() {
    return new Function("$this", ` return ${super.schema.code}`).call(this, this.context);
  }
}

export class ValueMap<T extends TypeMap> extends Value<T> {
  constructor(iterable: T["iterable"] = []) {
    super("Map");
    this.$schema.iterable = iterable;
  }
  get value() {
    const value = new Map<PropertyKey, T["$$"]>();
    return value;
  }
}

export class ValueSet<T extends TypeSet> extends Value<T> {
  constructor(elements: T["elements"] = []) {
    super("Set");
    this.$schema.elements = elements;
  }
  setElements(elements: T["elements"]) {
    this.$schema.elements = elements;
    return this;
  }
  addElement(element: T["elements"][number]) {
    if (!this.$schema.elements) {
      this.$schema.elements = [];
    }
    this.$schema.elements.push(element);
    return this;
  }
  get value() {
    const arrayLike = this.parseValue(<IArray>{
      type: "Array",
      elements: super.schema.elements
    });
    return new Set(arrayLike instanceof Array ? arrayLike : []);
  }
}

export class ValueWeakMap<T extends TypeWeakMap> extends Value<T> {
  constructor() {
    super("WeakMap");
  }
  get value() {
    return new WeakMap();
  }
}

export class ValueWeakSet<T extends TypeWeakSet> extends Value<T> {
  constructor() {
    super("WeakSet");
  }
  get value() {
    return new WeakSet();
  }
}

export class ValueNull<T extends TypeNull> extends Value<T> {
  constructor() {
    super("Null");
  }
  get value() {
    return null;
  }
}

export class ValueUndefined<T extends TypeUndefined> extends Value<T> {
  constructor() {
    super("Undefined");
  }
  get value() {
    return undefined;
  }
}

export class ValueRouter<T extends TypeRouter> extends Value<T> {
  constructor(schema?: TypeRouter) {
    super("Router");
    if (schema) {
      Object.assign(this.$schema, schema);
    }
  }
  get value() {
    const mode = this.parseValue(this.schema.mode);
    const routes = this.schema.routes.map(route => ({
      name: this.parseValue(route.name),
      path: this.parseValue(route.path),
      page: this.parseValue(route.page)
    }));
    return {
      mode,
      routes
    };
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
  }
}

export class ValuePinia extends Value<TypePinia> {
  constructor(schema?: TypePinia) {
    super("Pinia");
    if (schema) {
      super.setSchema(schema);
    }
  }

  get value(): Required<TypePinia>["$$"] {
    const key = new ValueString(this.schema.key.initial).value;
    const state = new ValueObject(this.schema.state).value || {};
    const getters = new ValueObject(this.schema.getters).value || {};
    const actions = new ValueObject(this.schema.actions).value || {};
    return {
      id: key,
      state,
      getters,
      actions
    };
  }
}

export class ValuePage<T extends TypePage> extends Value<T> {
  constructor(schema?: T) {
    super("Page");
    if (schema) {
      super.setSchema(schema);
    }
  }

  get value() {
    const id = new ValueString(super.schema.id.initial).value;
    const title = new ValueString(super.schema.title.initial).value;
    const version = new ValueString(super.schema.version.initial).value;
    const src = new ValueString(super.schema.src.initial).value;
    const style = this.parseValue(super.schema.style);
    const props = this.parseValue(super.schema.props);
    const commonProps = this.parseValue(super.schema.commonProps);
    const emits = this.parseValue(super.schema.emits);
    const listeners = this.parseValue(super.schema.listeners);
    const slots = new ValueObject(super.schema.slots).value;
    const config = <TypeMaterialConfig>{
      id,
      name: title,
      version,
      src,
      style,
      props,
      commonProps,
      emits,
      listeners,
      slots
    };
    return {
      id,
      title,
      config
    };
  }
}

export class ValueMultiPage<T extends TypeMultiPage> extends Value<T> {
  constructor(schema?: T) {
    super("MultiPage");
    if (schema) {
      super.setSchema(schema);
    }
  }

  get value() {
    const router = new ValueRouter(super.schema.router).value;
    const piniaList = super.schema.piniaList.map(pinia => new ValuePinia(pinia).value);
    const pageList = super.schema.pageList.map(page => new ValuePage(page).value);
    return {
      router,
      piniaList,
      pageList
    };
  }
}
