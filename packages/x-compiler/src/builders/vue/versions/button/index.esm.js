import { getCurrentInstance, inject, defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, toRef, toRefs, resolveComponent, createBlock, renderSlot, createCommentVNode, provide, reactive, createVNode } from 'vue';

const opt = Object.prototype.toString;

function isString(obj) {
  return opt.call(obj) === "[object String]";
}

function isNumber(obj) {
  return opt.call(obj) === "[object Number]" && obj === obj;
}

const configProviderInjectionKey = Symbol("ArcoConfigProvider");

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;

var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;

var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);

  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};

var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const COMPONENT_PREFIX = "A";
const CLASS_PREFIX = "arco";
const GLOBAL_CONFIG_NAME = "$arco";

const getComponentPrefix = options => {
  var _a;

  return (_a = options == null ? void 0 : options.componentPrefix) != null ? _a : COMPONENT_PREFIX;
};

const setGlobalConfig = (app, options) => {
  var _a;

  if (options && options.classPrefix) {
    app.config.globalProperties[GLOBAL_CONFIG_NAME] = __spreadProps(__spreadValues({}, (_a = app.config.globalProperties[GLOBAL_CONFIG_NAME]) != null ? _a : {}), {
      classPrefix: options.classPrefix
    });
  }
};

const getPrefixCls = componentName => {
  var _a, _b, _c;

  const instance = getCurrentInstance();
  const configProvider = inject(configProviderInjectionKey, void 0);
  const prefix = (_c = (_b = configProvider == null ? void 0 : configProvider.prefixCls) != null ? _b : (_a = instance == null ? void 0 : instance.appContext.config.globalProperties[GLOBAL_CONFIG_NAME]) == null ? void 0 : _a.classPrefix) != null ? _c : CLASS_PREFIX;

  if (componentName) {
    return `${prefix}-${componentName}`;
  }

  return prefix;
};

var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }

  return sfc;
};

const _sfc_main$2 = defineComponent({
  name: "IconLoading",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: value => {
        return ["butt", "round", "square"].includes(value);
      }
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: value => {
        return ["arcs", "bevel", "miter", "miter-clip", "round"].includes(value);
      }
    },
    spin: Boolean
  },

  setup(props) {
    const prefixCls = getPrefixCls("icon");
    const cls = computed(() => [prefixCls, `${prefixCls}-loading`, {
      [`${prefixCls}-spin`]: props.spin
    }]);
    const sizeStyle = computed(() => {
      if (props.size) {
        return {
          fontSize: isNumber(props.size) ? `${props.size}px` : props.size
        };
      }

      return void 0;
    });
    return {
      cls,
      sizeStyle
    };
  }

});

const _hoisted_1$1 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];

const _hoisted_2$1 = /* @__PURE__ */createElementVNode("path", {
  d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6"
}, null, -1);

const _hoisted_3 = [_hoisted_2$1];

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: normalizeClass(_ctx.cls),
    style: normalizeStyle(_ctx.sizeStyle),
    "stroke-width": _ctx.strokeWidth,
    "stroke-linecap": _ctx.strokeLinecap,
    "stroke-linejoin": _ctx.strokeLinejoin
  }, _hoisted_3, 14, _hoisted_1$1);
}

var _IconLoading = /* @__PURE__ */_export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

const IconLoading = Object.assign(_IconLoading, {
  install: (app, options) => {
    var _a;

    const iconPrefix = (_a = options == null ? void 0 : options.iconPrefix) != null ? _a : "";
    app.component(iconPrefix + _IconLoading.name, _IconLoading);
  }
});

const formItemInjectionKey = Symbol("ArcoFormItemContext");

const useFormItem = ({
  size,
  disabled,
  error,
  uninject
}) => {
  const formItemCtx = !uninject ? inject(formItemInjectionKey, {}) : {};
  const mergedSize = computed(() => {
    var _a;

    return (_a = size == null ? void 0 : size.value) != null ? _a : formItemCtx.size;
  });
  const mergedDisabled = computed(() => (disabled == null ? void 0 : disabled.value) || formItemCtx.disabled);
  const mergedError = computed(() => (error == null ? void 0 : error.value) || formItemCtx.error);
  const feedback = toRef(formItemCtx, "feedback");
  const eventHandlers = toRef(formItemCtx, "eventHandlers");
  return {
    formItemCtx,
    mergedSize,
    mergedDisabled,
    mergedError,
    feedback,
    eventHandlers
  };
};

const useSize = (size, {
  defaultValue = "medium"
} = {}) => {
  const configProviderCtx = inject(configProviderInjectionKey, void 0);
  const mergedSize = computed(() => {
    var _a, _b;

    return (_b = (_a = size == null ? void 0 : size.value) != null ? _a : configProviderCtx == null ? void 0 : configProviderCtx.size) != null ? _b : defaultValue;
  });
  return {
    mergedSize
  };
};

const buttonGroupInjectionKey = Symbol("ArcoButtonGroup");

const _sfc_main$1 = defineComponent({
  name: "Button",
  components: {
    IconLoading
  },
  props: {
    type: {
      type: String
    },
    shape: {
      type: String
    },
    status: {
      type: String
    },
    size: {
      type: String
    },
    long: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    htmlType: {
      type: String,
      default: "button"
    },
    href: String
  },
  emits: {
    click: ev => true
  },

  setup(props, {
    emit
  }) {
    const {
      size,
      disabled
    } = toRefs(props);
    const prefixCls = getPrefixCls("btn");
    const groupContext = inject(buttonGroupInjectionKey, void 0);

    const _size = computed(() => {
      var _a;

      return (_a = size.value) != null ? _a : groupContext == null ? void 0 : groupContext.size;
    });

    const _disabled = computed(() => Boolean(disabled.value || (groupContext == null ? void 0 : groupContext.disabled)));

    const {
      mergedSize: _mergedSize,
      mergedDisabled
    } = useFormItem({
      size: _size,
      disabled: _disabled
    });
    const {
      mergedSize
    } = useSize(_mergedSize);
    const cls = computed(() => {
      var _a, _b, _c, _d, _e, _f;

      return [prefixCls, `${prefixCls}-${(_b = (_a = props.type) != null ? _a : groupContext == null ? void 0 : groupContext.type) != null ? _b : "secondary"}`, `${prefixCls}-shape-${(_d = (_c = props.shape) != null ? _c : groupContext == null ? void 0 : groupContext.shape) != null ? _d : "square"}`, `${prefixCls}-size-${mergedSize.value}`, `${prefixCls}-status-${(_f = (_e = props.status) != null ? _e : groupContext == null ? void 0 : groupContext.status) != null ? _f : "normal"}`, {
        [`${prefixCls}-long`]: props.long,
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-link`]: isString(props.href)
      }];
    });

    const handleClick = ev => {
      if (props.disabled || props.loading) {
        return;
      }

      emit("click", ev);
    };

    return {
      prefixCls,
      cls,
      mergedDisabled,
      handleClick
    };
  }

});

const _hoisted_1 = ["href"];
const _hoisted_2 = ["type", "disabled"];

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_loading = resolveComponent("icon-loading");

  return _ctx.href ? (openBlock(), createElementBlock("a", {
    key: 0,
    class: normalizeClass([_ctx.cls, {
      [`${_ctx.prefixCls}-only-icon`]: _ctx.$slots.icon && !_ctx.$slots.default
    }]),
    href: _ctx.mergedDisabled || _ctx.loading ? void 0 : _ctx.href,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [_ctx.loading || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", {
    key: 0,
    class: normalizeClass(`${_ctx.prefixCls}-icon`)
  }, [_ctx.loading ? (openBlock(), createBlock(_component_icon_loading, {
    key: 0,
    spin: "true"
  })) : renderSlot(_ctx.$slots, "icon", {
    key: 1
  })], 2)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 10, _hoisted_1)) : (openBlock(), createElementBlock("button", {
    key: 1,
    class: normalizeClass([_ctx.cls, {
      [`${_ctx.prefixCls}-only-icon`]: _ctx.$slots.icon && !_ctx.$slots.default
    }]),
    type: _ctx.htmlType,
    disabled: _ctx.mergedDisabled,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [_ctx.loading || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", {
    key: 0,
    class: normalizeClass(`${_ctx.prefixCls}-icon`)
  }, [_ctx.loading ? (openBlock(), createBlock(_component_icon_loading, {
    key: 0,
    spin: true
  })) : renderSlot(_ctx.$slots, "icon", {
    key: 1
  })], 2)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 10, _hoisted_2));
}

var _Button = /* @__PURE__ */_export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

const _sfc_main = defineComponent({
  name: "ButtonGroup",
  props: {
    type: {
      type: String
    },
    status: {
      type: String
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },

  setup(props) {
    const {
      type,
      size,
      status,
      disabled,
      shape
    } = toRefs(props);
    const prefixCls = getPrefixCls("btn-group");
    provide(buttonGroupInjectionKey, reactive({
      type,
      size,
      shape,
      status,
      disabled
    }));
    return {
      prefixCls
    };
  }

});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.prefixCls)
  }, [renderSlot(_ctx.$slots, "default")], 2);
}

var ButtonGroup = /* @__PURE__ */_export_sfc(_sfc_main, [["render", _sfc_render]]);

const Button = Object.assign(_Button, {
  Group: ButtonGroup,
  install: (app, options) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);
    app.component(componentPrefix + _Button.name, _Button);
    app.component(componentPrefix + ButtonGroup.name, ButtonGroup);
  }
});

var script = defineComponent({
  props: {
    name: {
      type: String,
      default: "按钮"
    }
  },

  setup(props) {
    return () => createVNode(Button, null, {
      default: () => [props.name]
    });
  }

});

script.__file = "versions/button/index.source.vue";

export { script as default };
//# sourceMappingURL=index.esm.js.map
