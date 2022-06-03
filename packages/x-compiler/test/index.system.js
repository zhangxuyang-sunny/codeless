System.register(['vue'], (function (exports) {
  'use strict';
  var Fragment, isVNode, Comment, Text, defineComponent, inject, computed, createVNode, reactive, provide, watch, Transition$2, getCurrentInstance, onUpdated, nextTick, onMounted, onUnmounted, Teleport, ref, TransitionGroup, render, h$1, watchEffect, onBeforeUnmount;
  return {
    setters: [function (module) {
      Fragment = module.Fragment;
      isVNode = module.isVNode;
      Comment = module.Comment;
      Text = module.Text;
      defineComponent = module.defineComponent;
      inject = module.inject;
      computed = module.computed;
      createVNode = module.createVNode;
      reactive = module.reactive;
      provide = module.provide;
      watch = module.watch;
      Transition$2 = module.Transition;
      getCurrentInstance = module.getCurrentInstance;
      onUpdated = module.onUpdated;
      nextTick = module.nextTick;
      onMounted = module.onMounted;
      onUnmounted = module.onUnmounted;
      Teleport = module.Teleport;
      ref = module.ref;
      TransitionGroup = module.TransitionGroup;
      render = module.render;
      h$1 = module.h;
      watchEffect = module.watchEffect;
      onBeforeUnmount = module.onBeforeUnmount;
    }],
    execute: (function () {

      function _defineProperty$d(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }

        return keys;
      }

      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty$d(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }

        return target;
      }

      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };
        return _extends.apply(this, arguments);
      }

      function _typeof(obj) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
      }

      var isArray = Array.isArray;
      var isString = function isString(val) {
        return typeof val === 'string';
      };
      var isObject = function isObject(val) {
        return val !== null && _typeof(val) === 'object';
      };
      function renderHelper(v) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaultV = arguments.length > 2 ? arguments[2] : undefined;

        if (typeof v === 'function') {
          return v(props);
        }

        return v !== null && v !== void 0 ? v : defaultV;
      }

      function classNames() {
        var classes = [];

        for (var i = 0; i < arguments.length; i++) {
          var value = i < 0 || arguments.length <= i ? undefined : arguments[i];
          if (!value) continue;

          if (isString(value)) {
            classes.push(value);
          } else if (isArray(value)) {
            for (var _i = 0; _i < value.length; _i++) {
              var inner = classNames(value[_i]);

              if (inner) {
                classes.push(inner);
              }
            }
          } else if (isObject(value)) {
            for (var name in value) {
              if (value[name]) {
                classes.push(name);
              }
            }
          }
        }

        return classes.join(' ');
      }

      function _arrayWithHoles$2(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _iterableToArrayLimit$2(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;

        var _s, _e;

        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _arrayLikeToArray$2(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function _unsupportedIterableToArray$2(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
      }

      function _nonIterableRest$2() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _slicedToArray$2(arr, i) {
        return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
      }

      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
      }

      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }

      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
      }

      var isValid = function isValid(value) {
        return value !== undefined && value !== null && value !== '';
      };

      var isValid$1 = isValid;

      var initDefaultProps = function initDefaultProps(types, defaultProps) {
        var propTypes = _extends({}, types);

        Object.keys(defaultProps).forEach(function (k) {
          var prop = propTypes[k];

          if (prop) {
            if (prop.type || prop.default) {
              prop.default = defaultProps[k];
            } else if (prop.def) {
              prop.def(defaultProps[k]);
            } else {
              propTypes[k] = {
                type: prop,
                default: defaultProps[k]
              };
            }
          } else {
            throw new Error("not have ".concat(k, " prop"));
          }
        });
        return propTypes;
      };

      var initDefaultProps$1 = initDefaultProps;

      var flattenChildren = function flattenChildren() {
        var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filterEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var temp = Array.isArray(children) ? children : [children];
        var res = [];
        temp.forEach(function (child) {
          if (Array.isArray(child)) {
            res.push.apply(res, _toConsumableArray(flattenChildren(child, filterEmpty)));
          } else if (child && child.type === Fragment) {
            res.push.apply(res, _toConsumableArray(flattenChildren(child.children, filterEmpty)));
          } else if (child && isVNode(child)) {
            if (filterEmpty && !isEmptyElement(child)) {
              res.push(child);
            } else if (!filterEmpty) {
              res.push(child);
            }
          } else if (isValid$1(child)) {
            res.push(child);
          }
        });
        return res;
      };

      var findDOMNode = function findDOMNode(instance) {
        var _a;

        var node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);

        while (node && !node.tagName) {
          node = node.nextSibling;
        }

        return node;
      };
      function isEmptyElement(c) {
        return c && (c.type === Comment || c.type === Fragment && c.children.length === 0 || c.type === Text && c.children.trim() === '');
      }
      function filterEmpty() {
        var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var res = [];
        children.forEach(function (child) {
          if (Array.isArray(child)) {
            res.push.apply(res, _toConsumableArray(child));
          } else if (child.type === Fragment) {
            res.push.apply(res, _toConsumableArray(child.children));
          } else {
            res.push(child);
          }
        });
        return res.filter(function (c) {
          return !isEmptyElement(c);
        });
      }

      var raf = function raf(callback) {
        return setTimeout(callback, 16);
      };

      var caf = function caf(num) {
        return clearTimeout(num);
      };

      if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        raf = function raf(callback) {
          return window.requestAnimationFrame(callback);
        };

        caf = function caf(handle) {
          return window.cancelAnimationFrame(handle);
        };
      }

      var rafUUID = 0;
      var rafIds = new Map();

      function cleanup(id) {
        rafIds.delete(id);
      }

      function wrapperRaf(callback) {
        var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        rafUUID += 1;
        var id = rafUUID;

        function callRef(leftTimes) {
          if (leftTimes === 0) {
            // Clean up
            cleanup(id); // Trigger

            callback();
          } else {
            // Next raf
            var realId = raf(function () {
              callRef(leftTimes - 1);
            }); // Bind real raf id

            rafIds.set(id, realId);
          }
        }

        callRef(times);
        return id;
      }

      wrapperRaf.cancel = function (id) {
        var realId = rafIds.get(id);
        cleanup(realId);
        return caf(realId);
      };

      // https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
      var tuple = function tuple() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return args;
      };
      var withInstall = function withInstall(comp) {
        var c = comp;

        c.install = function (app) {
          app.component(c.displayName || c.name, comp);
        };

        return comp;
      };

      var enUS$1 = {
        // Options.jsx
        items_per_page: '/ page',
        jump_to: 'Go to',
        jump_to_confirm: 'confirm',
        page: '',
        // Pagination.jsx
        prev_page: 'Previous Page',
        next_page: 'Next Page',
        prev_5: 'Previous 5 Pages',
        next_5: 'Next 5 Pages',
        prev_3: 'Previous 3 Pages',
        next_3: 'Next 3 Pages'
      };

      var locale$2 = {
        locale: 'en_US',
        today: 'Today',
        now: 'Now',
        backToToday: 'Back to today',
        ok: 'Ok',
        clear: 'Clear',
        month: 'Month',
        year: 'Year',
        timeSelect: 'select time',
        dateSelect: 'select date',
        weekSelect: 'Choose a week',
        monthSelect: 'Choose a month',
        yearSelect: 'Choose a year',
        decadeSelect: 'Choose a decade',
        yearFormat: 'YYYY',
        dateFormat: 'M/D/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        monthBeforeYear: true,
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century'
      };
      var CalendarLocale = locale$2;

      var locale$1 = {
        placeholder: 'Select time',
        rangePlaceholder: ['Start time', 'End time']
      };
      var TimePicker = locale$1;

      var locale = {
        lang: _extends({
          placeholder: 'Select date',
          yearPlaceholder: 'Select year',
          quarterPlaceholder: 'Select quarter',
          monthPlaceholder: 'Select month',
          weekPlaceholder: 'Select week',
          rangePlaceholder: ['Start date', 'End date'],
          rangeYearPlaceholder: ['Start year', 'End year'],
          rangeQuarterPlaceholder: ['Start quarter', 'End quarter'],
          rangeMonthPlaceholder: ['Start month', 'End month'],
          rangeWeekPlaceholder: ['Start week', 'End week']
        }, CalendarLocale),
        timePickerLocale: _extends({}, TimePicker)
      }; // All settings at:
      // https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

      var enUS = locale;

      /* eslint-disable no-template-curly-in-string */
      var typeTemplate = '${label} is not a valid ${type}';
      var localeValues = {
        locale: 'en',
        Pagination: enUS$1,
        DatePicker: enUS,
        TimePicker: TimePicker,
        Calendar: enUS,
        global: {
          placeholder: 'Please select'
        },
        Table: {
          filterTitle: 'Filter menu',
          filterConfirm: 'OK',
          filterReset: 'Reset',
          filterEmptyText: 'No filters',
          filterCheckall: 'Select all items',
          filterSearchPlaceholder: 'Search in filters',
          emptyText: 'No data',
          selectAll: 'Select current page',
          selectInvert: 'Invert current page',
          selectNone: 'Clear all data',
          selectionAll: 'Select all data',
          sortTitle: 'Sort',
          expand: 'Expand row',
          collapse: 'Collapse row',
          triggerDesc: 'Click to sort descending',
          triggerAsc: 'Click to sort ascending',
          cancelSort: 'Click to cancel sorting'
        },
        Modal: {
          okText: 'OK',
          cancelText: 'Cancel',
          justOkText: 'OK'
        },
        Popconfirm: {
          okText: 'OK',
          cancelText: 'Cancel'
        },
        Transfer: {
          titles: ['', ''],
          searchPlaceholder: 'Search here',
          itemUnit: 'item',
          itemsUnit: 'items',
          remove: 'Remove',
          selectCurrent: 'Select current page',
          removeCurrent: 'Remove current page',
          selectAll: 'Select all data',
          removeAll: 'Remove all data',
          selectInvert: 'Invert current page'
        },
        Upload: {
          uploading: 'Uploading...',
          removeFile: 'Remove file',
          uploadError: 'Upload error',
          previewFile: 'Preview file',
          downloadFile: 'Download file'
        },
        Empty: {
          description: 'No Data'
        },
        Icon: {
          icon: 'icon'
        },
        Text: {
          edit: 'Edit',
          copy: 'Copy',
          copied: 'Copied',
          expand: 'Expand'
        },
        PageHeader: {
          back: 'Back'
        },
        Form: {
          optional: '(optional)',
          defaultValidateMessages: {
            default: 'Field validation error for ${label}',
            required: 'Please enter ${label}',
            enum: '${label} must be one of [${enum}]',
            whitespace: '${label} cannot be a blank character',
            date: {
              format: '${label} date format is invalid',
              parse: '${label} cannot be converted to a date',
              invalid: '${label} is an invalid date'
            },
            types: {
              string: typeTemplate,
              method: typeTemplate,
              array: typeTemplate,
              object: typeTemplate,
              number: typeTemplate,
              date: typeTemplate,
              boolean: typeTemplate,
              integer: typeTemplate,
              float: typeTemplate,
              regexp: typeTemplate,
              email: typeTemplate,
              url: typeTemplate,
              hex: typeTemplate
            },
            string: {
              len: '${label} must be ${len} characters',
              min: '${label} must be at least ${min} characters',
              max: '${label} must be up to ${max} characters',
              range: '${label} must be between ${min}-${max} characters'
            },
            number: {
              len: '${label} must be equal to ${len}',
              min: '${label} must be minimum ${min}',
              max: '${label} must be maximum ${max}',
              range: '${label} must be between ${min}-${max}'
            },
            array: {
              len: 'Must be ${len} ${label}',
              min: 'At least ${min} ${label}',
              max: 'At most ${max} ${label}',
              range: 'The amount of ${label} must be between ${min}-${max}'
            },
            pattern: {
              mismatch: '${label} does not match the pattern ${pattern}'
            }
          }
        },
        Image: {
          preview: 'Preview'
        }
      };
      var defaultLocale = localeValues;

      var LocaleReceiver = defineComponent({
        name: 'LocaleReceiver',
        props: {
          componentName: String,
          defaultLocale: {
            type: [Object, Function]
          },
          children: {
            type: Function
          }
        },
        setup: function setup(props, _ref) {
          var slots = _ref.slots;
          var localeData = inject('localeData', {});
          var locale = computed(function () {
            var _props$componentName = props.componentName,
                componentName = _props$componentName === void 0 ? 'global' : _props$componentName,
                defaultLocale$1 = props.defaultLocale;
            var locale = defaultLocale$1 || defaultLocale[componentName || 'global'];
            var antLocale = localeData.antLocale;
            var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
            return _extends(_extends({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
          });
          var localeCode = computed(function () {
            var antLocale = localeData.antLocale;
            var localeCode = antLocale && antLocale.locale; // Had use LocaleProvide but didn't set locale

            if (antLocale && antLocale.exist && !localeCode) {
              return defaultLocale.locale;
            }

            return localeCode;
          });
          return function () {
            var children = props.children || slots.default;
            var antLocale = localeData.antLocale;
            return children === null || children === void 0 ? void 0 : children(locale.value, localeCode.value, antLocale);
          };
        }
      });

      var Empty$2 = function Empty() {
        var _useConfigInject = useConfigInject('empty', {}),
            getPrefixCls = _useConfigInject.getPrefixCls;

        var prefixCls = getPrefixCls('empty-img-default');
        return createVNode("svg", {
          "class": prefixCls,
          "width": "184",
          "height": "152",
          "viewBox": "0 0 184 152"
        }, [createVNode("g", {
          "fill": "none",
          "fill-rule": "evenodd"
        }, [createVNode("g", {
          "transform": "translate(24 31.67)"
        }, [createVNode("ellipse", {
          "class": "".concat(prefixCls, "-ellipse"),
          "cx": "67.797",
          "cy": "106.89",
          "rx": "67.797",
          "ry": "12.668"
        }, null), createVNode("path", {
          "class": "".concat(prefixCls, "-path-1"),
          "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
        }, null), createVNode("path", {
          "class": "".concat(prefixCls, "-path-2"),
          "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
          "transform": "translate(13.56)"
        }, null), createVNode("path", {
          "class": "".concat(prefixCls, "-path-3"),
          "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
        }, null), createVNode("path", {
          "class": "".concat(prefixCls, "-path-4"),
          "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
        }, null)]), createVNode("path", {
          "class": "".concat(prefixCls, "-path-5"),
          "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
        }, null), createVNode("g", {
          "class": "".concat(prefixCls, "-g"),
          "transform": "translate(149.65 15.383)"
        }, [createVNode("ellipse", {
          "cx": "20.654",
          "cy": "3.167",
          "rx": "2.849",
          "ry": "2.815"
        }, null), createVNode("path", {
          "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
        }, null)])])]);
      };

      Empty$2.PRESENTED_IMAGE_DEFAULT = true;
      var DefaultEmptyImg = Empty$2;

      var Simple = function Simple() {
        var _useConfigInject = useConfigInject('empty', {}),
            getPrefixCls = _useConfigInject.getPrefixCls;

        var prefixCls = getPrefixCls('empty-img-simple');
        return createVNode("svg", {
          "class": prefixCls,
          "width": "64",
          "height": "41",
          "viewBox": "0 0 64 41"
        }, [createVNode("g", {
          "transform": "translate(0 1)",
          "fill": "none",
          "fill-rule": "evenodd"
        }, [createVNode("ellipse", {
          "class": "".concat(prefixCls, "-ellipse"),
          "fill": "#F5F5F5",
          "cx": "32",
          "cy": "33",
          "rx": "32",
          "ry": "7"
        }, null), createVNode("g", {
          "class": "".concat(prefixCls, "-g"),
          "fill-rule": "nonzero",
          "stroke": "#D9D9D9"
        }, [createVNode("path", {
          "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
        }, null), createVNode("path", {
          "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
          "fill": "#FAFAFA",
          "class": "".concat(prefixCls, "-path")
        }, null)])])]);
      };

      Simple.PRESENTED_IMAGE_SIMPLE = true;
      var SimpleEmptyImg = Simple;

      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      function t(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      }

      function n() {
        return (n = Object.assign || function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];

            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }

          return e;
        }).apply(this, arguments);
      }

      function r(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
      }

      function i(e, t) {
        if (null == e) return {};
        var n,
            r,
            i = {},
            o = Object.keys(e);

        for (r = 0; r < o.length; r++) t.indexOf(n = o[r]) >= 0 || (i[n] = e[n]);

        return i;
      }

      function o(e) {
        return 1 == (null != (t = e) && "object" == typeof t && !1 === Array.isArray(t)) && "[object Object]" === Object.prototype.toString.call(e);
        var t;
      }

      var u = Object.prototype,
          a = u.toString,
          f = u.hasOwnProperty,
          c = /^\s*function (\w+)/;

      function l(e) {
        var t,
            n = null !== (t = null == e ? void 0 : e.type) && void 0 !== t ? t : e;

        if (n) {
          var r = n.toString().match(c);
          return r ? r[1] : "";
        }

        return "";
      }

      var s = function (e) {
        var t, n;
        return !1 !== o(e) && "function" == typeof (t = e.constructor) && !1 !== o(n = t.prototype) && !1 !== n.hasOwnProperty("isPrototypeOf");
      },
          v = function (e) {
        return e;
      },
          y = v;

      if ("production" !== process.env.NODE_ENV) {
        var p = "undefined" != typeof console;
        y = p ? function (e) {
          console.warn("[VueTypes warn]: " + e);
        } : v;
      }

      var d = function (e, t) {
        return f.call(e, t);
      },
          h = Number.isInteger || function (e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
      },
          b = Array.isArray || function (e) {
        return "[object Array]" === a.call(e);
      },
          O = function (e) {
        return "[object Function]" === a.call(e);
      },
          g = function (e) {
        return s(e) && d(e, "_vueTypes_name");
      },
          m = function (e) {
        return s(e) && (d(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function (t) {
          return d(e, t);
        }));
      };

      function j(e, t) {
        return Object.defineProperty(e.bind(t), "__original", {
          value: e
        });
      }

      function _(e, t, n) {
        var r;
        void 0 === n && (n = !1);
        var i = !0,
            o = "";
        r = s(e) ? e : {
          type: e
        };
        var u = g(r) ? r._vueTypes_name + " - " : "";

        if (m(r) && null !== r.type) {
          if (void 0 === r.type || !0 === r.type) return i;
          if (!r.required && void 0 === t) return i;
          b(r.type) ? (i = r.type.some(function (e) {
            return !0 === _(e, t, !0);
          }), o = r.type.map(function (e) {
            return l(e);
          }).join(" or ")) : i = "Array" === (o = l(r)) ? b(t) : "Object" === o ? s(t) : "String" === o || "Number" === o || "Boolean" === o || "Function" === o ? function (e) {
            if (null == e) return "";
            var t = e.constructor.toString().match(c);
            return t ? t[1] : "";
          }(t) === o : t instanceof r.type;
        }

        if (!i) {
          var a = u + 'value "' + t + '" should be of type "' + o + '"';
          return !1 === n ? (y(a), !1) : a;
        }

        if (d(r, "validator") && O(r.validator)) {
          var f = y,
              v = [];

          if (y = function (e) {
            v.push(e);
          }, i = r.validator(t), y = f, !i) {
            var p = (v.length > 1 ? "* " : "") + v.join("\n* ");
            return v.length = 0, !1 === n ? (y(p), i) : p;
          }
        }

        return i;
      }

      function T(e, t) {
        var n = Object.defineProperties(t, {
          _vueTypes_name: {
            value: e,
            writable: !0
          },
          isRequired: {
            get: function () {
              return this.required = !0, this;
            }
          },
          def: {
            value: function (e) {
              return void 0 !== e || this.default ? O(e) || !0 === _(this, e, !0) ? (this.default = b(e) ? function () {
                return [].concat(e);
              } : s(e) ? function () {
                return Object.assign({}, e);
              } : e, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e + '"'), this) : this;
            }
          }
        }),
            r = n.validator;
        return O(r) && (n.validator = j(r, n)), n;
      }

      function w(e, t) {
        var n = T(e, t);
        return Object.defineProperty(n, "validate", {
          value: function (e) {
            return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e, this), this;
          }
        });
      }

      function k(e, t, n) {
        var r,
            o,
            u = (r = t, o = {}, Object.getOwnPropertyNames(r).forEach(function (e) {
          o[e] = Object.getOwnPropertyDescriptor(r, e);
        }), Object.defineProperties({}, o));
        if (u._vueTypes_name = e, !s(n)) return u;
        var a,
            f,
            c = n.validator,
            l = i(n, ["validator"]);

        if (O(c)) {
          var v = u.validator;
          v && (v = null !== (f = (a = v).__original) && void 0 !== f ? f : a), u.validator = j(v ? function (e) {
            return v.call(this, e) && c.call(this, e);
          } : c, u);
        }

        return Object.assign(u, l);
      }

      function P(e) {
        return e.replace(/^(?!\s*$)/gm, "  ");
      }

      var x = function () {
        return w("any", {});
      },
          A = function () {
        return w("function", {
          type: Function
        });
      },
          E = function () {
        return w("boolean", {
          type: Boolean
        });
      },
          N = function () {
        return w("string", {
          type: String
        });
      },
          q = function () {
        return w("number", {
          type: Number
        });
      },
          S = function () {
        return w("array", {
          type: Array
        });
      },
          V = function () {
        return w("object", {
          type: Object
        });
      },
          F = function () {
        return T("integer", {
          type: Number,
          validator: function (e) {
            return h(e);
          }
        });
      },
          D = function () {
        return T("symbol", {
          validator: function (e) {
            return "symbol" == typeof e;
          }
        });
      };

      function L(e, t) {
        if (void 0 === t && (t = "custom validation failed"), "function" != typeof e) throw new TypeError("[VueTypes error]: You must provide a function as argument");
        return T(e.name || "<<anonymous function>>", {
          validator: function (n) {
            var r = e(n);
            return r || y(this._vueTypes_name + " - " + t), r;
          }
        });
      }

      function Y(e) {
        if (!b(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument.");
        var t = 'oneOf - value should be one of "' + e.join('", "') + '".',
            n = e.reduce(function (e, t) {
          if (null != t) {
            var n = t.constructor;
            -1 === e.indexOf(n) && e.push(n);
          }

          return e;
        }, []);
        return T("oneOf", {
          type: n.length > 0 ? n : void 0,
          validator: function (n) {
            var r = -1 !== e.indexOf(n);
            return r || y(t), r;
          }
        });
      }

      function B(e) {
        if (!b(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument");

        for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
          var i = e[r];

          if (m(i)) {
            if (g(i) && "oneOf" === i._vueTypes_name) {
              n = n.concat(i.type);
              continue;
            }

            if (O(i.validator) && (t = !0), !0 !== i.type && i.type) {
              n = n.concat(i.type);
              continue;
            }
          }

          n.push(i);
        }

        return n = n.filter(function (e, t) {
          return n.indexOf(e) === t;
        }), T("oneOfType", t ? {
          type: n,
          validator: function (t) {
            var n = [],
                r = e.some(function (e) {
              var r = _(g(e) && "oneOf" === e._vueTypes_name ? e.type || null : e, t, !0);

              return "string" == typeof r && n.push(r), !0 === r;
            });
            return r || y("oneOfType - provided value does not match any of the " + n.length + " passed-in validators:\n" + P(n.join("\n"))), r;
          }
        } : {
          type: n
        });
      }

      function I(e) {
        return T("arrayOf", {
          type: Array,
          validator: function (t) {
            var n,
                r = t.every(function (t) {
              return !0 === (n = _(e, t, !0));
            });
            return r || y("arrayOf - value validation error:\n" + P(n)), r;
          }
        });
      }

      function J(e) {
        return T("instanceOf", {
          type: e
        });
      }

      function M(e) {
        return T("objectOf", {
          type: Object,
          validator: function (t) {
            var n,
                r = Object.keys(t).every(function (r) {
              return !0 === (n = _(e, t[r], !0));
            });
            return r || y("objectOf - value validation error:\n" + P(n)), r;
          }
        });
      }

      function R(e) {
        var t = Object.keys(e),
            n = t.filter(function (t) {
          var n;
          return !!(null === (n = e[t]) || void 0 === n ? void 0 : n.required);
        }),
            r = T("shape", {
          type: Object,
          validator: function (r) {
            var i = this;
            if (!s(r)) return !1;
            var o = Object.keys(r);

            if (n.length > 0 && n.some(function (e) {
              return -1 === o.indexOf(e);
            })) {
              var u = n.filter(function (e) {
                return -1 === o.indexOf(e);
              });
              return y(1 === u.length ? 'shape - required property "' + u[0] + '" is not defined.' : 'shape - required properties "' + u.join('", "') + '" are not defined.'), !1;
            }

            return o.every(function (n) {
              if (-1 === t.indexOf(n)) return !0 === i._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n + '" property. Allowed keys: "' + t.join('", "') + '".'), !1);

              var o = _(e[n], r[n], !0);

              return "string" == typeof o && y('shape - "' + n + '" property validation error:\n ' + P(o)), !0 === o;
            });
          }
        });
        return Object.defineProperty(r, "_vueTypes_isLoose", {
          writable: !0,
          value: !1
        }), Object.defineProperty(r, "loose", {
          get: function () {
            return this._vueTypes_isLoose = !0, this;
          }
        }), r;
      }

      var $ = function () {
        function e() {}

        return e.extend = function (e) {
          var t = this;
          if (b(e)) return e.forEach(function (e) {
            return t.extend(e);
          }), this;
          var n = e.name,
              r = e.validate,
              o = void 0 !== r && r,
              u = e.getter,
              a = void 0 !== u && u,
              f = i(e, ["name", "validate", "getter"]);
          if (d(this, n)) throw new TypeError('[VueTypes error]: Type "' + n + '" already defined');
          var c,
              l = f.type;
          return g(l) ? (delete f.type, Object.defineProperty(this, n, a ? {
            get: function () {
              return k(n, l, f);
            }
          } : {
            value: function () {
              var e,
                  t = k(n, l, f);
              return t.validator && (t.validator = (e = t.validator).bind.apply(e, [t].concat([].slice.call(arguments)))), t;
            }
          })) : (c = a ? {
            get: function () {
              var e = Object.assign({}, f);
              return o ? w(n, e) : T(n, e);
            },
            enumerable: !0
          } : {
            value: function () {
              var e,
                  t,
                  r = Object.assign({}, f);
              return e = o ? w(n, r) : T(n, r), r.validator && (e.validator = (t = r.validator).bind.apply(t, [e].concat([].slice.call(arguments)))), e;
            },
            enumerable: !0
          }, Object.defineProperty(this, n, c));
        }, t(e, null, [{
          key: "any",
          get: function () {
            return x();
          }
        }, {
          key: "func",
          get: function () {
            return A().def(this.defaults.func);
          }
        }, {
          key: "bool",
          get: function () {
            return E().def(this.defaults.bool);
          }
        }, {
          key: "string",
          get: function () {
            return N().def(this.defaults.string);
          }
        }, {
          key: "number",
          get: function () {
            return q().def(this.defaults.number);
          }
        }, {
          key: "array",
          get: function () {
            return S().def(this.defaults.array);
          }
        }, {
          key: "object",
          get: function () {
            return V().def(this.defaults.object);
          }
        }, {
          key: "integer",
          get: function () {
            return F().def(this.defaults.integer);
          }
        }, {
          key: "symbol",
          get: function () {
            return D();
          }
        }]), e;
      }();

      function z(e) {
        var i;
        return void 0 === e && (e = {
          func: function () {},
          bool: !0,
          string: "",
          number: 0,
          array: function () {
            return [];
          },
          object: function () {
            return {};
          },
          integer: 0
        }), (i = function (i) {
          function o() {
            return i.apply(this, arguments) || this;
          }

          return r(o, i), t(o, null, [{
            key: "sensibleDefaults",
            get: function () {
              return n({}, this.defaults);
            },
            set: function (t) {
              this.defaults = !1 !== t ? n({}, !0 !== t ? t : e) : {};
            }
          }]), o;
        }($)).defaults = n({}, e), i;
      }

      $.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = {
        validate: function (e, t) {
          return !0 === _(t, e, !0);
        },
        toType: function (e, t, n) {
          return void 0 === n && (n = !1), n ? w(e, t) : T(e, t);
        }
      };

      (function (e) {
        function t() {
          return e.apply(this, arguments) || this;
        }

        return r(t, e), t;
      })(z());

      var PropTypes = z({
        func: undefined,
        bool: undefined,
        string: undefined,
        number: undefined,
        array: undefined,
        object: undefined,
        integer: undefined
      });
      PropTypes.extend([{
        name: 'looseBool',
        getter: true,
        type: Boolean,
        default: undefined
      }, {
        name: 'style',
        getter: true,
        type: [String, Object],
        default: undefined
      }, {
        name: 'VueNode',
        getter: true,
        type: null
      }]);
      var PropTypes$1 = PropTypes;

      var __rest$2 = undefined && undefined.__rest || function (s, e) {
        var t = {};

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        }

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      };

      var defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);

      var simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);

      var Empty = function Empty(props, _ref) {
        var _ref$slots = _ref.slots,
            slots = _ref$slots === void 0 ? {} : _ref$slots,
            attrs = _ref.attrs;

        var _a;

        var _useConfigInject = useConfigInject('empty', props),
            direction = _useConfigInject.direction,
            prefixClsRef = _useConfigInject.prefixCls;

        var prefixCls = prefixClsRef.value;

        var _b = _extends(_extends({}, props), attrs),
            _b$image = _b.image,
            image = _b$image === void 0 ? defaultEmptyImg : _b$image,
            _b$description = _b.description,
            description = _b$description === void 0 ? ((_a = slots.description) === null || _a === void 0 ? void 0 : _a.call(slots)) || undefined : _b$description,
            imageStyle = _b.imageStyle,
            _b$class = _b.class,
            className = _b$class === void 0 ? '' : _b$class,
            restProps = __rest$2(_b, ["image", "description", "imageStyle", "class"]);

        return createVNode(LocaleReceiver, {
          "componentName": "Empty",
          "children": function children(locale) {
            var _classNames;

            var des = typeof description !== 'undefined' ? description : locale.description;
            var alt = typeof des === 'string' ? des : 'empty';
            var imageNode = null;

            if (typeof image === 'string') {
              imageNode = createVNode("img", {
                "alt": alt,
                "src": image
              }, null);
            } else {
              imageNode = image;
            }

            return createVNode("div", _objectSpread2({
              "class": classNames(prefixCls, className, (_classNames = {}, _defineProperty$d(_classNames, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), _defineProperty$d(_classNames, "".concat(prefixCls, "-rtl"), direction.value === 'rtl'), _classNames))
            }, restProps), [createVNode("div", {
              "class": "".concat(prefixCls, "-image"),
              "style": imageStyle
            }, [imageNode]), des && createVNode("p", {
              "class": "".concat(prefixCls, "-description")
            }, [des]), slots.default && createVNode("div", {
              "class": "".concat(prefixCls, "-footer")
            }, [filterEmpty(slots.default())])]);
          }
        }, null);
      };

      Empty.displayName = 'AEmpty';
      Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
      Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
      Empty.inheritAttrs = false;
      Empty.props = {
        prefixCls: String,
        image: PropTypes$1.any,
        description: PropTypes$1.any,
        imageStyle: {
          type: Object,
          default: undefined
        }
      };
      var Empty$1 = withInstall(Empty);

      var RenderEmpty = function RenderEmpty(props) {
        var _useConfigInject = useConfigInject('empty', props),
            prefixCls = _useConfigInject.prefixCls;

        var renderHtml = function renderHtml(componentName) {
          switch (componentName) {
            case 'Table':
            case 'List':
              return createVNode(Empty$1, {
                "image": Empty$1.PRESENTED_IMAGE_SIMPLE
              }, null);

            case 'Select':
            case 'TreeSelect':
            case 'Cascader':
            case 'Transfer':
            case 'Mentions':
              return createVNode(Empty$1, {
                "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
                "class": "".concat(prefixCls.value, "-small")
              }, null);

            default:
              return createVNode(Empty$1, null, null);
          }
        };

        return renderHtml(props.componentName);
      };

      function renderEmpty(componentName) {
        return createVNode(RenderEmpty, {
          "componentName": componentName
        }, null);
      }

      /* eslint-disable no-console */
      var warned = {};
      function warning$2(valid, message) {
        // Support uglify
        if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
          console.error("Warning: ".concat(message));
        }
      }
      function call(method, valid, message) {
        if (!valid && !warned[message]) {
          method(false, message);
          warned[message] = true;
        }
      }
      function warningOnce(valid, message) {
        call(warning$2, valid, message);
      }
      /* eslint-enable */

      var warning$1 = (function (valid, component) {
        var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        warningOnce(valid, "[antdv: ".concat(component, "] ").concat(message));
      });

      var ANT_MARK = 'internalMark';
      var LocaleProvider = defineComponent({
        name: 'ALocaleProvider',
        props: {
          locale: {
            type: Object
          },
          ANT_MARK__: String
        },
        setup: function setup(props, _ref) {
          var slots = _ref.slots;
          warning$1(props.ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead');
          var state = reactive({
            antLocale: _extends(_extends({}, props.locale), {
              exist: true
            }),
            ANT_MARK__: ANT_MARK
          });
          provide('localeData', state);
          watch(function () {
            return props.locale;
          }, function () {
            state.antLocale = _extends(_extends({}, props.locale), {
              exist: true
            });
          }, {
            immediate: true
          });
          return function () {
            var _a;

            return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
          };
        }
      });
      /* istanbul ignore next */

      LocaleProvider.install = function (app) {
        app.component(LocaleProvider.name, LocaleProvider);
        return app;
      };

      var LocaleProvider$1 = withInstall(LocaleProvider);

      var __rest$1 = undefined && undefined.__rest || function (s, e) {
        var t = {};

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        }

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      };
      tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight');
      var getTransitionGroupProps = function getTransitionGroupProps(transitionName) {
        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var transitionProps = transitionName ? _extends({
          name: transitionName,
          appear: true,
          // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
          appearActiveClass: "".concat(transitionName),
          appearToClass: "".concat(transitionName, "-appear ").concat(transitionName, "-appear-active"),
          enterFromClass: "".concat(transitionName, "-appear ").concat(transitionName, "-enter ").concat(transitionName, "-appear-prepare ").concat(transitionName, "-enter-prepare"),
          enterActiveClass: "".concat(transitionName),
          enterToClass: "".concat(transitionName, "-enter ").concat(transitionName, "-appear ").concat(transitionName, "-appear-active ").concat(transitionName, "-enter-active"),
          leaveActiveClass: "".concat(transitionName, " ").concat(transitionName, "-leave"),
          leaveToClass: "".concat(transitionName, "-leave-active")
        }, opt) : _extends({
          css: false
        }, opt);
        return transitionProps;
      };
      var Transition = Transition$2;

      if (process.env.NODE_ENV === 'test') {
        var warn$1 = true;
        Transition = defineComponent({
          name: 'TransitionForTest',
          inheritAttrs: false,
          setup: function setup(_props, _ref) {
            var slots = _ref.slots,
                attrs = _ref.attrs;
            var instance = getCurrentInstance();

            if (warn$1) {
              console.warn('application runing at test env, you should build use production env');
              warn$1 = false;
            }

            onUpdated(function () {
              var child = instance.subTree.children[0];

              if (child && child.dirs && child.dirs[0]) {
                var value = child.dirs[0].value;
                var oldValue = child.dirs[0].oldValue;

                if (!value && value !== oldValue) {
                  nextTick(function () {
                    if (attrs.onAfterLeave) {
                      attrs.onAfterLeave(instance.vnode.el);
                    }
                  });
                }
              }
            });
            return function () {
              var _a;

              return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
            };
          }
        });
        defineComponent({
          name: 'TransitionGroupForTest',
          inheritAttrs: false,
          props: ['tag', 'class'],
          setup: function setup(props, _ref2) {
            var slots = _ref2.slots;
            return function () {
              var _a;

              var Tag = props.tag,
                  rest = __rest$1(props, ["tag"]);

              var children = ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || [];

              if (Tag) {
                return createVNode(Tag, rest, {
                  default: function _default() {
                    return [children];
                  }
                });
              } else {
                return children;
              }
            };
          }
        });
      } // ================== Collapse Motion ==================
      var Transition$1 = Transition;

      var Notice = defineComponent({
        name: 'Notice',
        inheritAttrs: false,
        props: ['prefixCls', 'duration', 'updateMark', 'noticeKey', 'closeIcon', 'closable', 'props', 'onClick', 'onClose', 'holder', 'visible'],
        setup: function setup(props, _ref) {
          var attrs = _ref.attrs,
              slots = _ref.slots;
          var closeTimer;
          var duration = computed(function () {
            return props.duration === undefined ? 1.5 : props.duration;
          });

          var startCloseTimer = function startCloseTimer() {
            if (duration.value) {
              closeTimer = setTimeout(function () {
                close();
              }, duration.value * 1000);
            }
          };

          var clearCloseTimer = function clearCloseTimer() {
            if (closeTimer) {
              clearTimeout(closeTimer);
              closeTimer = null;
            }
          };

          var close = function close(e) {
            if (e) {
              e.stopPropagation();
            }

            clearCloseTimer();
            var onClose = props.onClose,
                noticeKey = props.noticeKey;

            if (onClose) {
              onClose(noticeKey);
            }
          };

          var restartCloseTimer = function restartCloseTimer() {
            clearCloseTimer();
            startCloseTimer();
          };

          onMounted(function () {
            startCloseTimer();
          });
          onUnmounted(function () {
            clearCloseTimer();
          });
          watch([duration, function () {
            return props.updateMark;
          }, function () {
            return props.visible;
          }], function (_ref2, _ref3) {
            var _ref4 = _slicedToArray$2(_ref2, 3),
                preDuration = _ref4[0],
                preUpdateMark = _ref4[1],
                preVisible = _ref4[2];

            var _ref5 = _slicedToArray$2(_ref3, 3),
                newDuration = _ref5[0],
                newUpdateMark = _ref5[1],
                newVisible = _ref5[2];

            if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
              restartCloseTimer();
            }
          }, {
            flush: 'post'
          });
          return function () {
            var _a, _b;

            var prefixCls = props.prefixCls,
                closable = props.closable,
                _props$closeIcon = props.closeIcon,
                closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$closeIcon,
                onClick = props.onClick,
                holder = props.holder;
            var className = attrs.class,
                style = attrs.style;
            var componentClass = "".concat(prefixCls, "-notice");
            var dataOrAriaAttributeProps = Object.keys(attrs).reduce(function (acc, key) {
              if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
                acc[key] = attrs[key];
              }

              return acc;
            }, {});

            var node = createVNode("div", _objectSpread2({
              "class": classNames(componentClass, className, _defineProperty$d({}, "".concat(componentClass, "-closable"), closable)),
              "style": style,
              "onMouseenter": clearCloseTimer,
              "onMouseleave": startCloseTimer,
              "onClick": onClick
            }, dataOrAriaAttributeProps), [createVNode("div", {
              "class": "".concat(componentClass, "-content")
            }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? createVNode("a", {
              "tabindex": 0,
              "onClick": close,
              "class": "".concat(componentClass, "-close")
            }, [closeIcon || createVNode("span", {
              "class": "".concat(componentClass, "-close-x")
            }, null)]) : null]);

            if (holder) {
              return createVNode(Teleport, {
                "to": holder
              }, {
                default: function _default() {
                  return node;
                }
              });
            }

            return node;
          };
        }
      });

      var __rest = undefined && undefined.__rest || function (s, e) {
        var t = {};

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        }

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      };
      var seed = 0;
      var now = Date.now();

      function getUuid() {
        var id = seed;
        seed += 1;
        return "rcNotification_".concat(now, "_").concat(id);
      }

      var Notification = defineComponent({
        name: 'Notification',
        inheritAttrs: false,
        props: ['prefixCls', 'transitionName', 'animation', 'maxCount', 'closeIcon'],
        setup: function setup(props, _ref) {
          var attrs = _ref.attrs,
              expose = _ref.expose,
              slots = _ref.slots;
          var hookRefs = new Map();
          var notices = ref([]);
          var transitionProps = computed(function () {
            var prefixCls = props.prefixCls,
                _props$animation = props.animation,
                animation = _props$animation === void 0 ? 'fade' : _props$animation;
            var name = props.transitionName;

            if (!name && animation) {
              name = "".concat(prefixCls, "-").concat(animation);
            }

            return getTransitionGroupProps(name);
          });

          var add = function add(originNotice, holderCallback) {
            var key = originNotice.key || getUuid();

            var notice = _extends(_extends({}, originNotice), {
              key: key
            });

            var maxCount = props.maxCount;
            var noticeIndex = notices.value.map(function (v) {
              return v.notice.key;
            }).indexOf(key);
            var updatedNotices = notices.value.concat();

            if (noticeIndex !== -1) {
              updatedNotices.splice(noticeIndex, 1, {
                notice: notice,
                holderCallback: holderCallback
              });
            } else {
              if (maxCount && notices.value.length >= maxCount) {
                // XXX, use key of first item to update new added (let React to move exsiting
                // instead of remove and mount). Same key was used before for both a) external
                // manual control and b) internal react 'key' prop , which is not that good.
                // eslint-disable-next-line no-param-reassign
                // zombieJ: Not know why use `updateKey`. This makes Notice infinite loop in jest.
                // Change to `updateMark` for compare instead.
                // https://github.com/react-component/notification/commit/32299e6be396f94040bfa82517eea940db947ece
                notice.key = updatedNotices[0].notice.key;
                notice.updateMark = getUuid(); // zombieJ: That's why. User may close by key directly.
                // We need record this but not re-render to avoid upper issue
                // https://github.com/react-component/notification/issues/129

                notice.userPassKey = key;
                updatedNotices.shift();
              }

              updatedNotices.push({
                notice: notice,
                holderCallback: holderCallback
              });
            }

            notices.value = updatedNotices;
          };

          var remove = function remove(removeKey) {
            notices.value = notices.value.filter(function (_ref2) {
              var _ref2$notice = _ref2.notice,
                  key = _ref2$notice.key,
                  userPassKey = _ref2$notice.userPassKey;
              var mergedKey = userPassKey || key;
              return mergedKey !== removeKey;
            });
          };

          expose({
            add: add,
            remove: remove,
            notices: notices
          });
          return function () {
            var _className;

            var _a;

            var prefixCls = props.prefixCls,
                _props$closeIcon = props.closeIcon,
                closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
              prefixCls: prefixCls
            }) : _props$closeIcon;
            var noticeNodes = notices.value.map(function (_ref3, index) {
              var notice = _ref3.notice,
                  holderCallback = _ref3.holderCallback;
              var updateMark = index === notices.value.length - 1 ? notice.updateMark : undefined;
              var key = notice.key,
                  userPassKey = notice.userPassKey;
              var content = notice.content;

              var noticeProps = _extends(_extends(_extends({
                prefixCls: prefixCls,
                closeIcon: typeof closeIcon === 'function' ? closeIcon({
                  prefixCls: prefixCls
                }) : closeIcon
              }, notice), notice.props), {
                key: key,
                noticeKey: userPassKey || key,
                updateMark: updateMark,
                onClose: function onClose(noticeKey) {
                  var _a;

                  remove(noticeKey);
                  (_a = notice.onClose) === null || _a === void 0 ? void 0 : _a.call(notice);
                },
                onClick: notice.onClick
              });

              if (holderCallback) {
                return createVNode("div", {
                  "key": key,
                  "class": "".concat(prefixCls, "-hook-holder"),
                  "ref": function ref(div) {
                    if (typeof key === 'undefined') {
                      return;
                    }

                    if (div) {
                      hookRefs.set(key, div);
                      holderCallback(div, noticeProps);
                    } else {
                      hookRefs.delete(key);
                    }
                  }
                }, null);
              }

              return createVNode(Notice, noticeProps, {
                default: function _default() {
                  return [typeof content === 'function' ? content({
                    prefixCls: prefixCls
                  }) : content];
                }
              });
            });
            var className = (_className = {}, _defineProperty$d(_className, prefixCls, 1), _defineProperty$d(_className, attrs.class, !!attrs.class), _className);
            return createVNode("div", {
              "class": className,
              "style": attrs.style || {
                top: '65px',
                left: '50%'
              }
            }, [createVNode(TransitionGroup, _objectSpread2({
              "tag": "div"
            }, transitionProps.value), {
              default: function _default() {
                return [noticeNodes];
              }
            })]);
          };
        }
      });

      Notification.newInstance = function newNotificationInstance(properties, callback) {
        var _a = properties || {},
            _a$name = _a.name,
            name = _a$name === void 0 ? 'notification' : _a$name,
            getContainer = _a.getContainer,
            appContext = _a.appContext,
            customizePrefixCls = _a.prefixCls,
            customRootPrefixCls = _a.rootPrefixCls,
            customTransitionName = _a.transitionName,
            hasTransitionName = _a.hasTransitionName,
            props = __rest(_a, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"]);

        var div = document.createElement('div');

        if (getContainer) {
          var root = getContainer();
          root.appendChild(div);
        } else {
          document.body.appendChild(div);
        }

        var Wrapper = defineComponent({
          name: 'NotificationWrapper',
          setup: function setup(_props, _ref4) {
            var attrs = _ref4.attrs;
            var notiRef = ref();
            onMounted(function () {
              callback({
                notice: function notice(noticeProps) {
                  var _a;

                  (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.add(noticeProps);
                },
                removeNotice: function removeNotice(key) {
                  var _a;

                  (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.remove(key);
                },
                destroy: function destroy() {
                  render(null, div);

                  if (div.parentNode) {
                    div.parentNode.removeChild(div);
                  }
                },
                component: notiRef
              });
            });
            return function () {
              var global = globalConfigForApi;
              var prefixCls = global.getPrefixCls(name, customizePrefixCls);
              var rootPrefixCls = global.getRootPrefixCls(customRootPrefixCls, prefixCls);
              var transitionName = hasTransitionName ? customTransitionName : "".concat(rootPrefixCls, "-").concat(customTransitionName);
              return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global), {}, {
                "notUpdateGlobalConfig": true,
                "prefixCls": rootPrefixCls
              }), {
                default: function _default() {
                  return [createVNode(Notification, _objectSpread2(_objectSpread2({
                    "ref": notiRef
                  }, attrs), {}, {
                    "prefixCls": prefixCls,
                    "transitionName": transitionName
                  }), null)];
                }
              });
            };
          }
        });
        var vm = createVNode(Wrapper, props);
        vm.appContext = appContext || vm.appContext;
        render(vm, div);
      };

      var Notification$1 = Notification;

      // This icon file is generated automatically.
      var LoadingOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "0 0 1024 1024",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
            }
          }]
        },
        "name": "loading",
        "theme": "outlined"
      };
      var LoadingOutlinedSvg = LoadingOutlined$2;

      /**
       * Take input from [0, n] and return it as [0, 1]
       * @hidden
       */
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = '100%';
        }

        var isPercent = isPercentage(n);
        n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n))); // Automatically convert percentage into number

        if (isPercent) {
          n = parseInt(String(n * max), 10) / 100;
        } // Handle floating point rounding errors


        if (Math.abs(n - max) < 0.000001) {
          return 1;
        } // Convert into [0, 1] range if it isn't already


        if (max === 360) {
          // If n is a hue given in degrees,
          // wrap around out-of-range values into [0, 360] range
          // then convert into [0, 1].
          n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
        } else {
          // If n not a hue given in degrees
          // Convert into [0, 1] range if it isn't already.
          n = n % max / parseFloat(String(max));
        }

        return n;
      }
      /**
       * Force a number between 0 and 1
       * @hidden
       */

      function clamp01(val) {
        return Math.min(1, Math.max(0, val));
      }
      /**
       * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
       * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
       * @hidden
       */

      function isOnePointZero(n) {
        return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
      }
      /**
       * Check to see if string passed in is a percentage
       * @hidden
       */

      function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') !== -1;
      }
      /**
       * Return a valid alpha value [0,1] with all invalid values being set to 1
       * @hidden
       */

      function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }

        return a;
      }
      /**
       * Replace a decimal with it's percentage value
       * @hidden
       */

      function convertToPercentage(n) {
        if (n <= 1) {
          return "".concat(Number(n) * 100, "%");
        }

        return n;
      }
      /**
       * Force a hex value to have 2 characters
       * @hidden
       */

      function pad2(c) {
        return c.length === 1 ? '0' + c : String(c);
      }

      // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

      /**
       * Handle bounds / percentage checking to conform to CSS color spec
       * <http://www.w3.org/TR/css3-color/>
       * *Assumes:* r, g, b in [0, 255] or [0, 1]
       * *Returns:* { r, g, b } in [0, 255]
       */

      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }
      /**
       * Converts an RGB color value to HSL.
       * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
       * *Returns:* { h, s, l } in [0,1]
       */

      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;

        if (max === min) {
          s = 0;
          h = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;

            case g:
              h = (b - r) / d + 2;
              break;

            case b:
              h = (r - g) / d + 4;
              break;
          }

          h /= 6;
        }

        return {
          h: h,
          s: s,
          l: l
        };
      }

      function hue2rgb(p, q, t) {
        if (t < 0) {
          t += 1;
        }

        if (t > 1) {
          t -= 1;
        }

        if (t < 1 / 6) {
          return p + (q - p) * (6 * t);
        }

        if (t < 1 / 2) {
          return q;
        }

        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }

        return p;
      }
      /**
       * Converts an HSL color value to RGB.
       *
       * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
       * *Returns:* { r, g, b } in the set [0, 255]
       */


      function hslToRgb(h, s, l) {
        var r;
        var g;
        var b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        if (s === 0) {
          // achromatic
          g = l;
          b = l;
          r = l;
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
      /**
       * Converts an RGB color value to HSV
       *
       * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
       * *Returns:* { h, s, v } in [0,1]
       */

      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;

        if (max === min) {
          h = 0; // achromatic
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;

            case g:
              h = (b - r) / d + 2;
              break;

            case b:
              h = (r - g) / d + 4;
              break;
          }

          h /= 6;
        }

        return {
          h: h,
          s: s,
          v: v
        };
      }
      /**
       * Converts an HSV color value to RGB.
       *
       * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
       * *Returns:* { r, g, b } in the set [0, 255]
       */

      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var mod = i % 6;
        var r = [v, q, p, p, t, v][mod];
        var g = [t, v, v, q, p, p][mod];
        var b = [p, p, t, v, v, q][mod];
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
      /**
       * Converts an RGB color to hex
       *
       * Assumes r, g, and b are contained in the set [0, 255]
       * Returns a 3 or 6 character hex
       */

      function rgbToHex(r, g, b, allow3Char) {
        var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))]; // Return a 3 character hex if possible

        if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join('');
      }
      /**
       * Converts an RGBA color plus alpha transparency to hex
       *
       * Assumes r, g, b are contained in the set [0, 255] and
       * a in [0, 1]. Returns a 4 or 8 character rgba hex
       */
      // eslint-disable-next-line max-params

      function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

        if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join('');
      }
      /** Converts a decimal to a hex value */

      function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      }
      /** Converts a hex value to a decimal */

      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }
      /** Parse a base-16 hex value into a base-10 integer */

      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }
      function numberInputToObject(color) {
        return {
          r: color >> 16,
          g: (color & 0xff00) >> 8,
          b: color & 0xff
        };
      }

      // https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json

      /**
       * @hidden
       */
      var names = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        goldenrod: '#daa520',
        gold: '#ffd700',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavenderblush: '#fff0f5',
        lavender: '#e6e6fa',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
      };

      /**
       * Given a string or object, convert that input to RGB
       *
       * Possible string inputs:
       * ```
       * "red"
       * "#f00" or "f00"
       * "#ff0000" or "ff0000"
       * "#ff000000" or "ff000000"
       * "rgb 255 0 0" or "rgb (255, 0, 0)"
       * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
       * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
       * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
       * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
       * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
       * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
       * ```
       */

      function inputToRGB(color) {
        var rgb = {
          r: 0,
          g: 0,
          b: 0
        };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color === 'string') {
          color = stringInputToObject(color);
        }

        if (typeof color === 'object') {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
          }

          if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
          }
        }

        a = boundAlpha(a);
        return {
          ok: ok,
          format: color.format || format,
          r: Math.min(255, Math.max(rgb.r, 0)),
          g: Math.min(255, Math.max(rgb.g, 0)),
          b: Math.min(255, Math.max(rgb.b, 0)),
          a: a
        };
      } // <http://www.w3.org/TR/css3-values/#integers>

      var CSS_INTEGER = '[-\\+]?\\d+%?'; // <http://www.w3.org/TR/css3-values/#number-value>

      var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

      var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")"); // Actual matching.
      // Parentheses and commas are optional, but not required.
      // Whitespace can take the place of commas or opening paren

      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
      var matchers = {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
        rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
        hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
        hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
        hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
        hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
      /**
       * Permissive string parsing.  Take in a number of formats, and output an object
       * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
       */

      function stringInputToObject(color) {
        color = color.trim().toLowerCase();

        if (color.length === 0) {
          return false;
        }

        var named = false;

        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color === 'transparent') {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: 'name'
          };
        } // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.


        var match = matchers.rgb.exec(color);

        if (match) {
          return {
            r: match[1],
            g: match[2],
            b: match[3]
          };
        }

        match = matchers.rgba.exec(color);

        if (match) {
          return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
          };
        }

        match = matchers.hsl.exec(color);

        if (match) {
          return {
            h: match[1],
            s: match[2],
            l: match[3]
          };
        }

        match = matchers.hsla.exec(color);

        if (match) {
          return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
          };
        }

        match = matchers.hsv.exec(color);

        if (match) {
          return {
            h: match[1],
            s: match[2],
            v: match[3]
          };
        }

        match = matchers.hsva.exec(color);

        if (match) {
          return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
          };
        }

        match = matchers.hex8.exec(color);

        if (match) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8'
          };
        }

        match = matchers.hex6.exec(color);

        if (match) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex'
          };
        }

        match = matchers.hex4.exec(color);

        if (match) {
          return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8'
          };
        }

        match = matchers.hex3.exec(color);

        if (match) {
          return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex'
          };
        }

        return false;
      }
      /**
       * Check to see if it looks like a CSS unit
       * (see `matchers` above for definition).
       */

      function isValidCSSUnit(color) {
        return Boolean(matchers.CSS_UNIT.exec(String(color)));
      }

      var TinyColor =
      /** @class */
      function () {
        function TinyColor(color, opts) {
          if (color === void 0) {
            color = '';
          }

          if (opts === void 0) {
            opts = {};
          }

          var _a; // If input is already a tinycolor, return itself


          if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
          }

          if (typeof color === 'number') {
            color = numberInputToObject(color);
          }

          this.originalInput = color;
          var rgb = inputToRGB(color);
          this.originalInput = color;
          this.r = rgb.r;
          this.g = rgb.g;
          this.b = rgb.b;
          this.a = rgb.a;
          this.roundA = Math.round(100 * this.a) / 100;
          this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
          this.gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
          // Potentially lose a little bit of precision here, but will fix issues where
          // .5 gets interpreted as half of the total, instead of half of 1
          // If it was supposed to be 128, this was already taken care of by `inputToRgb`

          if (this.r < 1) {
            this.r = Math.round(this.r);
          }

          if (this.g < 1) {
            this.g = Math.round(this.g);
          }

          if (this.b < 1) {
            this.b = Math.round(this.b);
          }

          this.isValid = rgb.ok;
        }

        TinyColor.prototype.isDark = function () {
          return this.getBrightness() < 128;
        };

        TinyColor.prototype.isLight = function () {
          return !this.isDark();
        };
        /**
         * Returns the perceived brightness of the color, from 0-255.
         */


        TinyColor.prototype.getBrightness = function () {
          // http://www.w3.org/TR/AERT#color-contrast
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        };
        /**
         * Returns the perceived luminance of a color, from 0-1.
         */


        TinyColor.prototype.getLuminance = function () {
          // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
          var rgb = this.toRgb();
          var R;
          var G;
          var B;
          var RsRGB = rgb.r / 255;
          var GsRGB = rgb.g / 255;
          var BsRGB = rgb.b / 255;

          if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
          } else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
          }

          if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
          } else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
          }

          if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
          } else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
          }

          return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        };
        /**
         * Returns the alpha value of a color, from 0-1.
         */


        TinyColor.prototype.getAlpha = function () {
          return this.a;
        };
        /**
         * Sets the alpha value on the current color.
         *
         * @param alpha - The new alpha value. The accepted range is 0-1.
         */


        TinyColor.prototype.setAlpha = function (alpha) {
          this.a = boundAlpha(alpha);
          this.roundA = Math.round(100 * this.a) / 100;
          return this;
        };
        /**
         * Returns the object as a HSVA object.
         */


        TinyColor.prototype.toHsv = function () {
          var hsv = rgbToHsv(this.r, this.g, this.b);
          return {
            h: hsv.h * 360,
            s: hsv.s,
            v: hsv.v,
            a: this.a
          };
        };
        /**
         * Returns the hsva values interpolated into a string with the following format:
         * "hsva(xxx, xxx, xxx, xx)".
         */


        TinyColor.prototype.toHsvString = function () {
          var hsv = rgbToHsv(this.r, this.g, this.b);
          var h = Math.round(hsv.h * 360);
          var s = Math.round(hsv.s * 100);
          var v = Math.round(hsv.v * 100);
          return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
        };
        /**
         * Returns the object as a HSLA object.
         */


        TinyColor.prototype.toHsl = function () {
          var hsl = rgbToHsl(this.r, this.g, this.b);
          return {
            h: hsl.h * 360,
            s: hsl.s,
            l: hsl.l,
            a: this.a
          };
        };
        /**
         * Returns the hsla values interpolated into a string with the following format:
         * "hsla(xxx, xxx, xxx, xx)".
         */


        TinyColor.prototype.toHslString = function () {
          var hsl = rgbToHsl(this.r, this.g, this.b);
          var h = Math.round(hsl.h * 360);
          var s = Math.round(hsl.s * 100);
          var l = Math.round(hsl.l * 100);
          return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
        };
        /**
         * Returns the hex value of the color.
         * @param allow3Char will shorten hex value to 3 char if possible
         */


        TinyColor.prototype.toHex = function (allow3Char) {
          if (allow3Char === void 0) {
            allow3Char = false;
          }

          return rgbToHex(this.r, this.g, this.b, allow3Char);
        };
        /**
         * Returns the hex value of the color -with a # appened.
         * @param allow3Char will shorten hex value to 3 char if possible
         */


        TinyColor.prototype.toHexString = function (allow3Char) {
          if (allow3Char === void 0) {
            allow3Char = false;
          }

          return '#' + this.toHex(allow3Char);
        };
        /**
         * Returns the hex 8 value of the color.
         * @param allow4Char will shorten hex value to 4 char if possible
         */


        TinyColor.prototype.toHex8 = function (allow4Char) {
          if (allow4Char === void 0) {
            allow4Char = false;
          }

          return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
        };
        /**
         * Returns the hex 8 value of the color -with a # appened.
         * @param allow4Char will shorten hex value to 4 char if possible
         */


        TinyColor.prototype.toHex8String = function (allow4Char) {
          if (allow4Char === void 0) {
            allow4Char = false;
          }

          return '#' + this.toHex8(allow4Char);
        };
        /**
         * Returns the object as a RGBA object.
         */


        TinyColor.prototype.toRgb = function () {
          return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a
          };
        };
        /**
         * Returns the RGBA values interpolated into a string with the following format:
         * "RGBA(xxx, xxx, xxx, xx)".
         */


        TinyColor.prototype.toRgbString = function () {
          var r = Math.round(this.r);
          var g = Math.round(this.g);
          var b = Math.round(this.b);
          return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
        };
        /**
         * Returns the object as a RGBA object.
         */


        TinyColor.prototype.toPercentageRgb = function () {
          var fmt = function (x) {
            return "".concat(Math.round(bound01(x, 255) * 100), "%");
          };

          return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a
          };
        };
        /**
         * Returns the RGBA relative values interpolated into a string
         */


        TinyColor.prototype.toPercentageRgbString = function () {
          var rnd = function (x) {
            return Math.round(bound01(x, 255) * 100);
          };

          return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
        };
        /**
         * The 'real' name of the color -if there is one.
         */


        TinyColor.prototype.toName = function () {
          if (this.a === 0) {
            return 'transparent';
          }

          if (this.a < 1) {
            return false;
          }

          var hex = '#' + rgbToHex(this.r, this.g, this.b, false);

          for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                value = _b[1];

            if (hex === value) {
              return key;
            }
          }

          return false;
        };

        TinyColor.prototype.toString = function (format) {
          var formatSet = Boolean(format);
          format = format !== null && format !== void 0 ? format : this.format;
          var formattedString = false;
          var hasAlpha = this.a < 1 && this.a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');

          if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
              return this.toName();
            }

            return this.toRgbString();
          }

          if (format === 'rgb') {
            formattedString = this.toRgbString();
          }

          if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
          }

          if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
          }

          if (format === 'hex3') {
            formattedString = this.toHexString(true);
          }

          if (format === 'hex4') {
            formattedString = this.toHex8String(true);
          }

          if (format === 'hex8') {
            formattedString = this.toHex8String();
          }

          if (format === 'name') {
            formattedString = this.toName();
          }

          if (format === 'hsl') {
            formattedString = this.toHslString();
          }

          if (format === 'hsv') {
            formattedString = this.toHsvString();
          }

          return formattedString || this.toHexString();
        };

        TinyColor.prototype.toNumber = function () {
          return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
        };

        TinyColor.prototype.clone = function () {
          return new TinyColor(this.toString());
        };
        /**
         * Lighten the color a given amount. Providing 100 will always return white.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.lighten = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          var hsl = this.toHsl();
          hsl.l += amount / 100;
          hsl.l = clamp01(hsl.l);
          return new TinyColor(hsl);
        };
        /**
         * Brighten the color a given amount, from 0 to 100.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.brighten = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          var rgb = this.toRgb();
          rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
          rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
          rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
          return new TinyColor(rgb);
        };
        /**
         * Darken the color a given amount, from 0 to 100.
         * Providing 100 will always return black.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.darken = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          var hsl = this.toHsl();
          hsl.l -= amount / 100;
          hsl.l = clamp01(hsl.l);
          return new TinyColor(hsl);
        };
        /**
         * Mix the color with pure white, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return white.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.tint = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          return this.mix('white', amount);
        };
        /**
         * Mix the color with pure black, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return black.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.shade = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          return this.mix('black', amount);
        };
        /**
         * Desaturate the color a given amount, from 0 to 100.
         * Providing 100 will is the same as calling greyscale
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.desaturate = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          var hsl = this.toHsl();
          hsl.s -= amount / 100;
          hsl.s = clamp01(hsl.s);
          return new TinyColor(hsl);
        };
        /**
         * Saturate the color a given amount, from 0 to 100.
         * @param amount - valid between 1-100
         */


        TinyColor.prototype.saturate = function (amount) {
          if (amount === void 0) {
            amount = 10;
          }

          var hsl = this.toHsl();
          hsl.s += amount / 100;
          hsl.s = clamp01(hsl.s);
          return new TinyColor(hsl);
        };
        /**
         * Completely desaturates a color into greyscale.
         * Same as calling `desaturate(100)`
         */


        TinyColor.prototype.greyscale = function () {
          return this.desaturate(100);
        };
        /**
         * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
         * Values outside of this range will be wrapped into this range.
         */


        TinyColor.prototype.spin = function (amount) {
          var hsl = this.toHsl();
          var hue = (hsl.h + amount) % 360;
          hsl.h = hue < 0 ? 360 + hue : hue;
          return new TinyColor(hsl);
        };
        /**
         * Mix the current color a given amount with another color, from 0 to 100.
         * 0 means no mixing (return current color).
         */


        TinyColor.prototype.mix = function (color, amount) {
          if (amount === void 0) {
            amount = 50;
          }

          var rgb1 = this.toRgb();
          var rgb2 = new TinyColor(color).toRgb();
          var p = amount / 100;
          var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a
          };
          return new TinyColor(rgba);
        };

        TinyColor.prototype.analogous = function (results, slices) {
          if (results === void 0) {
            results = 6;
          }

          if (slices === void 0) {
            slices = 30;
          }

          var hsl = this.toHsl();
          var part = 360 / slices;
          var ret = [this];

          for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
          }

          return ret;
        };
        /**
         * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
         */


        TinyColor.prototype.complement = function () {
          var hsl = this.toHsl();
          hsl.h = (hsl.h + 180) % 360;
          return new TinyColor(hsl);
        };

        TinyColor.prototype.monochromatic = function (results) {
          if (results === void 0) {
            results = 6;
          }

          var hsv = this.toHsv();
          var h = hsv.h;
          var s = hsv.s;
          var v = hsv.v;
          var res = [];
          var modification = 1 / results;

          while (results--) {
            res.push(new TinyColor({
              h: h,
              s: s,
              v: v
            }));
            v = (v + modification) % 1;
          }

          return res;
        };

        TinyColor.prototype.splitcomplement = function () {
          var hsl = this.toHsl();
          var h = hsl.h;
          return [this, new TinyColor({
            h: (h + 72) % 360,
            s: hsl.s,
            l: hsl.l
          }), new TinyColor({
            h: (h + 216) % 360,
            s: hsl.s,
            l: hsl.l
          })];
        };
        /**
         * Compute how the color would appear on a background
         */


        TinyColor.prototype.onBackground = function (background) {
          var fg = this.toRgb();
          var bg = new TinyColor(background).toRgb();
          return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a
          });
        };
        /**
         * Alias for `polyad(3)`
         */


        TinyColor.prototype.triad = function () {
          return this.polyad(3);
        };
        /**
         * Alias for `polyad(4)`
         */


        TinyColor.prototype.tetrad = function () {
          return this.polyad(4);
        };
        /**
         * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
         * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
         */


        TinyColor.prototype.polyad = function (n) {
          var hsl = this.toHsl();
          var h = hsl.h;
          var result = [this];
          var increment = 360 / n;

          for (var i = 1; i < n; i++) {
            result.push(new TinyColor({
              h: (h + i * increment) % 360,
              s: hsl.s,
              l: hsl.l
            }));
          }

          return result;
        };
        /**
         * compare color vs current color
         */


        TinyColor.prototype.equals = function (color) {
          return this.toRgbString() === new TinyColor(color).toRgbString();
        };

        return TinyColor;
      }();

      var hueStep = 2; // 色相阶梯

      var saturationStep = 0.16; // 饱和度阶梯，浅色部分

      var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

      var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

      var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

      var lightColorCount = 5; // 浅色数量，主色上

      var darkColorCount = 4; // 深色数量，主色下
      // 暗色主题颜色映射关系表

      var darkColorMap = [{
        index: 7,
        opacity: 0.15
      }, {
        index: 6,
        opacity: 0.25
      }, {
        index: 5,
        opacity: 0.3
      }, {
        index: 5,
        opacity: 0.45
      }, {
        index: 5,
        opacity: 0.65
      }, {
        index: 5,
        opacity: 0.85
      }, {
        index: 4,
        opacity: 0.9
      }, {
        index: 3,
        opacity: 0.95
      }, {
        index: 2,
        opacity: 0.97
      }, {
        index: 1,
        opacity: 0.98
      }]; // Wrapper function ported from TinyColor.prototype.toHsv
      // Keep it here because of `hsv.h * 360`

      function toHsv(_ref) {
        var r = _ref.r,
            g = _ref.g,
            b = _ref.b;
        var hsv = rgbToHsv(r, g, b);
        return {
          h: hsv.h * 360,
          s: hsv.s,
          v: hsv.v
        };
      } // Wrapper function ported from TinyColor.prototype.toHexString
      // Keep it here because of the prefix `#`


      function toHex(_ref2) {
        var r = _ref2.r,
            g = _ref2.g,
            b = _ref2.b;
        return "#".concat(rgbToHex(r, g, b, false));
      } // Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
      // Amount in range [0, 1]
      // Assume color1 & color2 has no alpha, since the following src code did so.


      function mix(rgb1, rgb2, amount) {
        var p = amount / 100;
        var rgb = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b
        };
        return rgb;
      }

      function getHue(hsv, i, light) {
        var hue; // 根据色相不同，色相转向不同

        if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
          hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
        } else {
          hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
        }

        if (hue < 0) {
          hue += 360;
        } else if (hue >= 360) {
          hue -= 360;
        }

        return hue;
      }

      function getSaturation(hsv, i, light) {
        // grey color don't change saturation
        if (hsv.h === 0 && hsv.s === 0) {
          return hsv.s;
        }

        var saturation;

        if (light) {
          saturation = hsv.s - saturationStep * i;
        } else if (i === darkColorCount) {
          saturation = hsv.s + saturationStep;
        } else {
          saturation = hsv.s + saturationStep2 * i;
        } // 边界值修正


        if (saturation > 1) {
          saturation = 1;
        } // 第一格的 s 限制在 0.06-0.1 之间


        if (light && i === lightColorCount && saturation > 0.1) {
          saturation = 0.1;
        }

        if (saturation < 0.06) {
          saturation = 0.06;
        }

        return Number(saturation.toFixed(2));
      }

      function getValue(hsv, i, light) {
        var value;

        if (light) {
          value = hsv.v + brightnessStep1 * i;
        } else {
          value = hsv.v - brightnessStep2 * i;
        }

        if (value > 1) {
          value = 1;
        }

        return Number(value.toFixed(2));
      }

      function generate$1(color) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var patterns = [];
        var pColor = inputToRGB(color);

        for (var i = lightColorCount; i > 0; i -= 1) {
          var hsv = toHsv(pColor);
          var colorString = toHex(inputToRGB({
            h: getHue(hsv, i, true),
            s: getSaturation(hsv, i, true),
            v: getValue(hsv, i, true)
          }));
          patterns.push(colorString);
        }

        patterns.push(toHex(pColor));

        for (var _i = 1; _i <= darkColorCount; _i += 1) {
          var _hsv = toHsv(pColor);

          var _colorString = toHex(inputToRGB({
            h: getHue(_hsv, _i),
            s: getSaturation(_hsv, _i),
            v: getValue(_hsv, _i)
          }));

          patterns.push(_colorString);
        } // dark theme patterns


        if (opts.theme === 'dark') {
          return darkColorMap.map(function (_ref3) {
            var index = _ref3.index,
                opacity = _ref3.opacity;
            var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || '#141414'), inputToRGB(patterns[index]), opacity * 100));
            return darkColorString;
          });
        }

        return patterns;
      }

      var presetPrimaryColors = {
        red: '#F5222D',
        volcano: '#FA541C',
        orange: '#FA8C16',
        gold: '#FAAD14',
        yellow: '#FADB14',
        lime: '#A0D911',
        green: '#52C41A',
        cyan: '#13C2C2',
        blue: '#1890FF',
        geekblue: '#2F54EB',
        purple: '#722ED1',
        magenta: '#EB2F96',
        grey: '#666666'
      };
      var presetPalettes = {};
      var presetDarkPalettes = {};
      Object.keys(presetPrimaryColors).forEach(function (key) {
        presetPalettes[key] = generate$1(presetPrimaryColors[key]);
        presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

        presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
          theme: 'dark',
          backgroundColor: '#141414'
        });
        presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
      });

      // https://github.com/substack/insert-css
      var containers = []; // will store container HTMLElement references

      var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

      var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

      function createStyleElement() {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        return styleElement;
      } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


      function insertCss(css, options) {
        options = options || {};

        if (css === undefined) {
          throw new Error(usage);
        }

        var position = options.prepend === true ? 'prepend' : 'append';
        var container = options.container !== undefined ? options.container : document.querySelector('head');
        var containerId = containers.indexOf(container); // first time we see this container, create the necessary entries

        if (containerId === -1) {
          containerId = containers.push(container) - 1;
          styleElements[containerId] = {};
        } // try to get the correponding container + position styleElement, create it otherwise


        var styleElement;

        if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
          styleElement = styleElements[containerId][position];
        } else {
          styleElement = styleElements[containerId][position] = createStyleElement();

          if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
          } else {
            container.appendChild(styleElement);
          }
        } // strip potential UTF-8 BOM if css was read from a file


        if (css.charCodeAt(0) === 0xfeff) {
          css = css.substr(1, css.length);
        } // actually add the stylesheet


        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText += css;
        } else {
          styleElement.textContent += css;
        }

        return styleElement;
      }

      function _objectSpread$c(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$c(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$c(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }
      function warn(valid, message) {
        // Support uglify
        if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
          console.error("Warning: ".concat(message));
        }
      }
      function warning(valid, message) {
        warn(valid, "[@ant-design/icons-vue] ".concat(message));
      } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

      function isIconDefinition(target) {
        return typeof target === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof target.icon === 'object' || typeof target.icon === 'function');
      }
      function generate(node, key, rootProps) {
        if (!rootProps) {
          return h$1(node.tag, _objectSpread$c({
            key: key
          }, node.attrs), (node.children || []).map(function (child, index) {
            return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
          }));
        }

        return h$1(node.tag, _objectSpread$c({
          key: key
        }, rootProps, node.attrs), (node.children || []).map(function (child, index) {
          return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
        }));
      }
      function getSecondaryColor(primaryColor) {
        // choose the second color
        return generate$1(primaryColor)[0];
      }
      function normalizeTwoToneColors(twoToneColor) {
        if (!twoToneColor) {
          return [];
        }

        return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
      } // These props make sure that the SVG behaviours like general text.
      var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
      var cssInjectedFlag = false;
      var useInsertStyles = function useInsertStyles() {
        var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
        nextTick(function () {
          if (!cssInjectedFlag) {
            if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
              insertCss(styleStr, {
                prepend: true
              });
            }

            cssInjectedFlag = true;
          }
        });
      };

      var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];

      function _objectWithoutProperties$1(source, excluded) {
        if (source == null) return {};

        var target = _objectWithoutPropertiesLoose$1(source, excluded);

        var key, i;

        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }

        return target;
      }

      function _objectWithoutPropertiesLoose$1(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }

        return target;
      }

      function _objectSpread$b(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$b(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$b(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }
      var twoToneColorPalette = {
        primaryColor: '#333',
        secondaryColor: '#E6E6E6',
        calculated: false
      };

      function setTwoToneColors(_ref) {
        var primaryColor = _ref.primaryColor,
            secondaryColor = _ref.secondaryColor;
        twoToneColorPalette.primaryColor = primaryColor;
        twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
        twoToneColorPalette.calculated = !!secondaryColor;
      }

      function getTwoToneColors() {
        return _objectSpread$b({}, twoToneColorPalette);
      }

      var IconBase = function IconBase(props, context) {
        var _props$context$attrs = _objectSpread$b({}, props, context.attrs),
            icon = _props$context$attrs.icon,
            primaryColor = _props$context$attrs.primaryColor,
            secondaryColor = _props$context$attrs.secondaryColor,
            restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);

        var colors = twoToneColorPalette;

        if (primaryColor) {
          colors = {
            primaryColor: primaryColor,
            secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
          };
        }

        useInsertStyles();
        warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

        if (!isIconDefinition(icon)) {
          return null;
        }

        var target = icon;

        if (target && typeof target.icon === 'function') {
          target = _objectSpread$b({}, target, {
            icon: target.icon(colors.primaryColor, colors.secondaryColor)
          });
        }

        return generate(target.icon, "svg-".concat(target.name), _objectSpread$b({}, restProps, {
          'data-icon': target.name,
          width: '1em',
          height: '1em',
          fill: 'currentColor',
          'aria-hidden': 'true'
        })); // },
      };

      IconBase.props = {
        icon: Object,
        primaryColor: String,
        secondaryColor: String,
        focusable: String
      };
      IconBase.inheritAttrs = false;
      IconBase.displayName = 'IconBase';
      IconBase.getTwoToneColors = getTwoToneColors;
      IconBase.setTwoToneColors = setTwoToneColors;
      var VueIcon = IconBase;

      function _slicedToArray$1(arr, i) {
        return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
      }

      function _nonIterableRest$1() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _unsupportedIterableToArray$1(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
      }

      function _arrayLikeToArray$1(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function _iterableToArrayLimit$1(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;

        var _s, _e;

        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _arrayWithHoles$1(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function setTwoToneColor(twoToneColor) {
        var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
            _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
            primaryColor = _normalizeTwoToneColo2[0],
            secondaryColor = _normalizeTwoToneColo2[1];

        return VueIcon.setTwoToneColors({
          primaryColor: primaryColor,
          secondaryColor: secondaryColor
        });
      }
      function getTwoToneColor() {
        var colors = VueIcon.getTwoToneColors();

        if (!colors.calculated) {
          return colors.primaryColor;
        }

        return [colors.primaryColor, colors.secondaryColor];
      }

      var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;

        var _s, _e;

        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _objectSpread$a(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$a(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$a(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};

        var target = _objectWithoutPropertiesLoose(source, excluded);

        var key, i;

        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }

        return target;
      }

      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }

        return target;
      }

      setTwoToneColor('#1890ff');

      var Icon = function Icon(props, context) {
        var _classObj;

        var _props$context$attrs = _objectSpread$a({}, props, context.attrs),
            cls = _props$context$attrs["class"],
            icon = _props$context$attrs.icon,
            spin = _props$context$attrs.spin,
            rotate = _props$context$attrs.rotate,
            tabindex = _props$context$attrs.tabindex,
            twoToneColor = _props$context$attrs.twoToneColor,
            onClick = _props$context$attrs.onClick,
            restProps = _objectWithoutProperties(_props$context$attrs, _excluded);

        var classObj = (_classObj = {
          anticon: true
        }, _defineProperty$a(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$a(_classObj, cls, cls), _classObj);
        var svgClassString = spin === '' || !!spin || icon.name === 'loading' ? 'anticon-spin' : '';
        var iconTabIndex = tabindex;

        if (iconTabIndex === undefined && onClick) {
          iconTabIndex = -1;
          restProps.tabindex = iconTabIndex;
        }

        var svgStyle = rotate ? {
          msTransform: "rotate(".concat(rotate, "deg)"),
          transform: "rotate(".concat(rotate, "deg)")
        } : undefined;

        var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
            _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2),
            primaryColor = _normalizeTwoToneColo2[0],
            secondaryColor = _normalizeTwoToneColo2[1];

        return createVNode("span", _objectSpread$a({
          "role": "img",
          "aria-label": icon.name
        }, restProps, {
          "onClick": onClick,
          "class": classObj
        }), [createVNode(VueIcon, {
          "class": svgClassString,
          "icon": icon,
          "primaryColor": primaryColor,
          "secondaryColor": secondaryColor,
          "style": svgStyle
        }, null)]);
      };

      Icon.props = {
        spin: Boolean,
        rotate: Number,
        icon: Object,
        twoToneColor: String
      };
      Icon.displayName = 'AntdIcon';
      Icon.inheritAttrs = false;
      Icon.getTwoToneColor = getTwoToneColor;
      Icon.setTwoToneColor = setTwoToneColor;
      var AntdIcon = Icon;

      function _objectSpread$9(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$9(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$9(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var LoadingOutlined = function LoadingOutlined(props, context) {
        var p = _objectSpread$9({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$9({}, p, {
          "icon": LoadingOutlinedSvg
        }), null);
      };

      LoadingOutlined.displayName = 'LoadingOutlined';
      LoadingOutlined.inheritAttrs = false;
      var LoadingOutlined$1 = LoadingOutlined;

      // This icon file is generated automatically.
      var ExclamationCircleFilled$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
            }
          }]
        },
        "name": "exclamation-circle",
        "theme": "filled"
      };
      var ExclamationCircleFilledSvg = ExclamationCircleFilled$2;

      function _objectSpread$8(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$8(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$8(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var ExclamationCircleFilled = function ExclamationCircleFilled(props, context) {
        var p = _objectSpread$8({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$8({}, p, {
          "icon": ExclamationCircleFilledSvg
        }), null);
      };

      ExclamationCircleFilled.displayName = 'ExclamationCircleFilled';
      ExclamationCircleFilled.inheritAttrs = false;
      var ExclamationCircleFilled$1 = ExclamationCircleFilled;

      // This icon file is generated automatically.
      var CloseCircleFilled$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
            }
          }]
        },
        "name": "close-circle",
        "theme": "filled"
      };
      var CloseCircleFilledSvg = CloseCircleFilled$2;

      function _objectSpread$7(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$7(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$7(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var CloseCircleFilled = function CloseCircleFilled(props, context) {
        var p = _objectSpread$7({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$7({}, p, {
          "icon": CloseCircleFilledSvg
        }), null);
      };

      CloseCircleFilled.displayName = 'CloseCircleFilled';
      CloseCircleFilled.inheritAttrs = false;
      var CloseCircleFilled$1 = CloseCircleFilled;

      // This icon file is generated automatically.
      var CheckCircleFilled$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
            }
          }]
        },
        "name": "check-circle",
        "theme": "filled"
      };
      var CheckCircleFilledSvg = CheckCircleFilled$2;

      function _objectSpread$6(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$6(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$6(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var CheckCircleFilled = function CheckCircleFilled(props, context) {
        var p = _objectSpread$6({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$6({}, p, {
          "icon": CheckCircleFilledSvg
        }), null);
      };

      CheckCircleFilled.displayName = 'CheckCircleFilled';
      CheckCircleFilled.inheritAttrs = false;
      var CheckCircleFilled$1 = CheckCircleFilled;

      // This icon file is generated automatically.
      var InfoCircleFilled$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
            }
          }]
        },
        "name": "info-circle",
        "theme": "filled"
      };
      var InfoCircleFilledSvg = InfoCircleFilled$2;

      function _objectSpread$5(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$5(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$5(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var InfoCircleFilled = function InfoCircleFilled(props, context) {
        var p = _objectSpread$5({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$5({}, p, {
          "icon": InfoCircleFilledSvg
        }), null);
      };

      InfoCircleFilled.displayName = 'InfoCircleFilled';
      InfoCircleFilled.inheritAttrs = false;
      var InfoCircleFilled$1 = InfoCircleFilled;

      var defaultDuration$1 = 3;
      var defaultTop$1;
      var messageInstance;
      var key = 1;
      var localPrefixCls = '';
      var transitionName = 'move-up';
      var hasTransitionName = false;

      var getContainer$1 = function getContainer() {
        return document.body;
      };

      var maxCount$1;
      var rtl$1 = false;
      function getKeyThenIncreaseKey() {
        return key++;
      }

      function setMessageConfig(options) {
        if (options.top !== undefined) {
          defaultTop$1 = options.top;
          messageInstance = null; // delete messageInstance for new defaultTop
        }

        if (options.duration !== undefined) {
          defaultDuration$1 = options.duration;
        }

        if (options.prefixCls !== undefined) {
          localPrefixCls = options.prefixCls;
        }

        if (options.getContainer !== undefined) {
          getContainer$1 = options.getContainer;
          messageInstance = null; // delete messageInstance for new getContainer
        }

        if (options.transitionName !== undefined) {
          transitionName = options.transitionName;
          messageInstance = null; // delete messageInstance for new transitionName

          hasTransitionName = true;
        }

        if (options.maxCount !== undefined) {
          maxCount$1 = options.maxCount;
          messageInstance = null;
        }

        if (options.rtl !== undefined) {
          rtl$1 = options.rtl;
        }
      }

      function getMessageInstance(args, callback) {
        if (messageInstance) {
          callback(messageInstance);
          return;
        }

        Notification$1.newInstance({
          appContext: args.appContext,
          prefixCls: args.prefixCls || localPrefixCls,
          rootPrefixCls: args.rootPrefixCls,
          transitionName: transitionName,
          hasTransitionName: hasTransitionName,
          style: {
            top: defaultTop$1
          },
          getContainer: getContainer$1 || args.getPopupContainer,
          maxCount: maxCount$1,
          name: 'message'
        }, function (instance) {
          if (messageInstance) {
            callback(messageInstance);
            return;
          }

          messageInstance = instance;
          callback(instance);
        });
      }

      var typeToIcon$1 = {
        info: InfoCircleFilled$1,
        success: CheckCircleFilled$1,
        error: CloseCircleFilled$1,
        warning: ExclamationCircleFilled$1,
        loading: LoadingOutlined$1
      };

      function notice$1(args) {
        var duration = args.duration !== undefined ? args.duration : defaultDuration$1;
        var target = args.key || getKeyThenIncreaseKey();
        var closePromise = new Promise(function (resolve) {
          var callback = function callback() {
            if (typeof args.onClose === 'function') {
              args.onClose();
            }

            return resolve(true);
          };

          getMessageInstance(args, function (instance) {
            instance.notice({
              key: target,
              duration: duration,
              style: args.style || {},
              class: args.class,
              content: function content(_ref) {
                var _classNames;

                var prefixCls = _ref.prefixCls;
                var Icon = typeToIcon$1[args.type];
                var iconNode = Icon ? createVNode(Icon, null, null) : '';
                var messageClass = classNames("".concat(prefixCls, "-custom-content"), (_classNames = {}, _defineProperty$d(_classNames, "".concat(prefixCls, "-").concat(args.type), args.type), _defineProperty$d(_classNames, "".concat(prefixCls, "-rtl"), rtl$1 === true), _classNames));
                return createVNode("div", {
                  "class": messageClass
                }, [typeof args.icon === 'function' ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === 'function' ? args.content() : args.content])]);
              },
              onClose: callback,
              onClick: args.onClick
            });
          });
        });

        var result = function result() {
          if (messageInstance) {
            messageInstance.removeNotice(target);
          }
        };

        result.then = function (filled, rejected) {
          return closePromise.then(filled, rejected);
        };

        result.promise = closePromise;
        return result;
      }

      function isArgsProps(content) {
        return Object.prototype.toString.call(content) === '[object Object]' && !!content.content;
      }

      var api$1 = {
        open: notice$1,
        config: setMessageConfig,
        destroy: function destroy(messageKey) {
          if (messageInstance) {
            if (messageKey) {
              var _messageInstance = messageInstance,
                  removeNotice = _messageInstance.removeNotice;
              removeNotice(messageKey);
            } else {
              var _messageInstance2 = messageInstance,
                  destroy = _messageInstance2.destroy;
              destroy();
              messageInstance = null;
            }
          }
        }
      };
      function attachTypeApi(originalApi, type) {
        originalApi[type] = function (content, duration, onClose) {
          if (isArgsProps(content)) {
            return originalApi.open(_extends(_extends({}, content), {
              type: type
            }));
          }

          if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
          }

          return originalApi.open({
            content: content,
            duration: duration,
            type: type,
            onClose: onClose
          });
        };
      }
      ['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
        return attachTypeApi(api$1, type);
      });
      api$1.warn = api$1.warning;
      var message = api$1;

      // This icon file is generated automatically.
      var CheckCircleOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
            }
          }, {
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            }
          }]
        },
        "name": "check-circle",
        "theme": "outlined"
      };
      var CheckCircleOutlinedSvg = CheckCircleOutlined$2;

      function _objectSpread$4(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$4(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$4(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var CheckCircleOutlined = function CheckCircleOutlined(props, context) {
        var p = _objectSpread$4({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$4({}, p, {
          "icon": CheckCircleOutlinedSvg
        }), null);
      };

      CheckCircleOutlined.displayName = 'CheckCircleOutlined';
      CheckCircleOutlined.inheritAttrs = false;
      var CheckCircleOutlined$1 = CheckCircleOutlined;

      // This icon file is generated automatically.
      var InfoCircleOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            }
          }, {
            "tag": "path",
            "attrs": {
              "d": "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
            }
          }]
        },
        "name": "info-circle",
        "theme": "outlined"
      };
      var InfoCircleOutlinedSvg = InfoCircleOutlined$2;

      function _objectSpread$3(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$3(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$3(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var InfoCircleOutlined = function InfoCircleOutlined(props, context) {
        var p = _objectSpread$3({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$3({}, p, {
          "icon": InfoCircleOutlinedSvg
        }), null);
      };

      InfoCircleOutlined.displayName = 'InfoCircleOutlined';
      InfoCircleOutlined.inheritAttrs = false;
      var InfoCircleOutlined$1 = InfoCircleOutlined;

      // This icon file is generated automatically.
      var CloseCircleOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
            }
          }, {
            "tag": "path",
            "attrs": {
              "d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            }
          }]
        },
        "name": "close-circle",
        "theme": "outlined"
      };
      var CloseCircleOutlinedSvg = CloseCircleOutlined$2;

      function _objectSpread$2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$2(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$2(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var CloseCircleOutlined = function CloseCircleOutlined(props, context) {
        var p = _objectSpread$2({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$2({}, p, {
          "icon": CloseCircleOutlinedSvg
        }), null);
      };

      CloseCircleOutlined.displayName = 'CloseCircleOutlined';
      CloseCircleOutlined.inheritAttrs = false;
      var CloseCircleOutlined$1 = CloseCircleOutlined;

      // This icon file is generated automatically.
      var ExclamationCircleOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            }
          }, {
            "tag": "path",
            "attrs": {
              "d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
            }
          }]
        },
        "name": "exclamation-circle",
        "theme": "outlined"
      };
      var ExclamationCircleOutlinedSvg = ExclamationCircleOutlined$2;

      function _objectSpread$1(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty$1(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var ExclamationCircleOutlined = function ExclamationCircleOutlined(props, context) {
        var p = _objectSpread$1({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread$1({}, p, {
          "icon": ExclamationCircleOutlinedSvg
        }), null);
      };

      ExclamationCircleOutlined.displayName = 'ExclamationCircleOutlined';
      ExclamationCircleOutlined.inheritAttrs = false;
      var ExclamationCircleOutlined$1 = ExclamationCircleOutlined;

      // This icon file is generated automatically.
      var CloseOutlined$2 = {
        "icon": {
          "tag": "svg",
          "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
          },
          "children": [{
            "tag": "path",
            "attrs": {
              "d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            }
          }]
        },
        "name": "close",
        "theme": "outlined"
      };
      var CloseOutlinedSvg = CloseOutlined$2;

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? Object(arguments[i]) : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      } // GENERATE BY ./scripts/generate.ts

      var CloseOutlined = function CloseOutlined(props, context) {
        var p = _objectSpread({}, props, context.attrs);

        return createVNode(AntdIcon, _objectSpread({}, p, {
          "icon": CloseOutlinedSvg
        }), null);
      };

      CloseOutlined.displayName = 'CloseOutlined';
      CloseOutlined.inheritAttrs = false;
      var CloseOutlined$1 = CloseOutlined;

      var notificationInstance = {};
      var defaultDuration = 4.5;
      var defaultTop = '24px';
      var defaultBottom = '24px';
      var defaultPrefixCls$1 = '';
      var defaultPlacement = 'topRight';

      var defaultGetContainer = function defaultGetContainer() {
        return document.body;
      };

      var defaultCloseIcon = null;
      var rtl = false;
      var maxCount;

      function setNotificationConfig(options) {
        var duration = options.duration,
            placement = options.placement,
            bottom = options.bottom,
            top = options.top,
            getContainer = options.getContainer,
            closeIcon = options.closeIcon,
            prefixCls = options.prefixCls;

        if (prefixCls !== undefined) {
          defaultPrefixCls$1 = prefixCls;
        }

        if (duration !== undefined) {
          defaultDuration = duration;
        }

        if (placement !== undefined) {
          defaultPlacement = placement;
        }

        if (bottom !== undefined) {
          defaultBottom = typeof bottom === 'number' ? "".concat(bottom, "px") : bottom;
        }

        if (top !== undefined) {
          defaultTop = typeof top === 'number' ? "".concat(top, "px") : top;
        }

        if (getContainer !== undefined) {
          defaultGetContainer = getContainer;
        }

        if (closeIcon !== undefined) {
          defaultCloseIcon = closeIcon;
        }

        if (options.rtl !== undefined) {
          rtl = options.rtl;
        }

        if (options.maxCount !== undefined) {
          maxCount = options.maxCount;
        }
      }

      function getPlacementStyle(placement) {
        var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTop;
        var bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultBottom;
        var style;

        switch (placement) {
          case 'topLeft':
            style = {
              left: '0px',
              top: top,
              bottom: 'auto'
            };
            break;

          case 'topRight':
            style = {
              right: '0px',
              top: top,
              bottom: 'auto'
            };
            break;

          case 'bottomLeft':
            style = {
              left: '0px',
              top: 'auto',
              bottom: bottom
            };
            break;

          default:
            style = {
              right: '0px',
              top: 'auto',
              bottom: bottom
            };
            break;
        }

        return style;
      }

      function getNotificationInstance(_ref, callback) {
        var customizePrefixCls = _ref.prefixCls,
            _ref$placement = _ref.placement,
            placement = _ref$placement === void 0 ? defaultPlacement : _ref$placement,
            _ref$getContainer = _ref.getContainer,
            getContainer = _ref$getContainer === void 0 ? defaultGetContainer : _ref$getContainer,
            top = _ref.top,
            bottom = _ref.bottom,
            _ref$closeIcon = _ref.closeIcon,
            _closeIcon = _ref$closeIcon === void 0 ? defaultCloseIcon : _ref$closeIcon,
            appContext = _ref.appContext;

        var _globalConfig = globalConfig(),
            getPrefixCls = _globalConfig.getPrefixCls;

        var prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls$1);
        var cacheKey = "".concat(prefixCls, "-").concat(placement, "-").concat(rtl);
        var cacheInstance = notificationInstance[cacheKey];

        if (cacheInstance) {
          Promise.resolve(cacheInstance).then(function (instance) {
            callback(instance);
          });
          return;
        }

        var notificationClass = classNames("".concat(prefixCls, "-").concat(placement), _defineProperty$d({}, "".concat(prefixCls, "-rtl"), rtl === true));
        Notification$1.newInstance({
          name: 'notification',
          prefixCls: customizePrefixCls || defaultPrefixCls$1,
          class: notificationClass,
          style: getPlacementStyle(placement, top, bottom),
          appContext: appContext,
          getContainer: getContainer,
          closeIcon: function closeIcon(_ref2) {
            var prefixCls = _ref2.prefixCls;

            var closeIconToRender = createVNode("span", {
              "class": "".concat(prefixCls, "-close-x")
            }, [renderHelper(_closeIcon, {}, createVNode(CloseOutlined$1, {
              "class": "".concat(prefixCls, "-close-icon")
            }, null))]);

            return closeIconToRender;
          },
          maxCount: maxCount,
          hasTransitionName: true
        }, function (notification) {
          notificationInstance[cacheKey] = notification;
          callback(notification);
        });
      }

      var typeToIcon = {
        success: CheckCircleOutlined$1,
        info: InfoCircleOutlined$1,
        error: CloseCircleOutlined$1,
        warning: ExclamationCircleOutlined$1
      };

      function notice(args) {
        var icon = args.icon,
            type = args.type,
            description = args.description,
            message = args.message,
            btn = args.btn;
        var duration = args.duration === undefined ? defaultDuration : args.duration;
        getNotificationInstance(args, function (notification) {
          notification.notice({
            content: function content(_ref3) {
              var outerPrefixCls = _ref3.prefixCls;
              var prefixCls = "".concat(outerPrefixCls, "-notice");
              var iconNode = null;

              if (icon) {
                iconNode = function iconNode() {
                  return createVNode("span", {
                    "class": "".concat(prefixCls, "-icon")
                  }, [renderHelper(icon)]);
                };
              } else if (type) {
                var Icon = typeToIcon[type];

                iconNode = function iconNode() {
                  return createVNode(Icon, {
                    "class": "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type)
                  }, null);
                };
              }

              return createVNode("div", {
                "class": iconNode ? "".concat(prefixCls, "-with-icon") : ''
              }, [iconNode && iconNode(), createVNode("div", {
                "class": "".concat(prefixCls, "-message")
              }, [!description && iconNode ? createVNode("span", {
                "class": "".concat(prefixCls, "-message-single-line-auto-margin")
              }, null) : null, renderHelper(message)]), createVNode("div", {
                "class": "".concat(prefixCls, "-description")
              }, [renderHelper(description)]), btn ? createVNode("span", {
                "class": "".concat(prefixCls, "-btn")
              }, [renderHelper(btn)]) : null]);
            },
            duration: duration,
            closable: true,
            onClose: args.onClose,
            onClick: args.onClick,
            key: args.key,
            style: args.style || {},
            class: args.class
          });
        });
      }

      var api = {
        open: notice,
        close: function close(key) {
          Object.keys(notificationInstance).forEach(function (cacheKey) {
            return Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
              instance.removeNotice(key);
            });
          });
        },
        config: setNotificationConfig,
        destroy: function destroy() {
          Object.keys(notificationInstance).forEach(function (cacheKey) {
            Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
              instance.destroy();
            });
            delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
          });
        }
      };
      var iconTypes = ['success', 'info', 'warning', 'error'];
      iconTypes.forEach(function (type) {
        api[type] = function (args) {
          return api.open(_extends(_extends({}, args), {
            type: type
          }));
        };
      });
      api.warn = api.warning;
      var notification = api;

      function canUseDom() {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
      }

      var MARK_KEY = "vc-util-key";

      function getMark() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            mark = _ref.mark;

        if (mark) {
          return mark.startsWith('data-') ? mark : "data-".concat(mark);
        }

        return MARK_KEY;
      }

      function getContainer(option) {
        if (option.attachTo) {
          return option.attachTo;
        }

        var head = document.querySelector('head');
        return head || document.body;
      }

      function injectCSS(css) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _a, _b;

        if (!canUseDom()) {
          return null;
        }

        var styleNode = document.createElement('style');

        if ((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) {
          styleNode.nonce = (_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce;
        }

        styleNode.innerHTML = css;
        var container = getContainer(option);
        var firstChild = container.firstChild;

        if (option.prepend && container.prepend) {
          // Use `prepend` first
          container.prepend(styleNode);
        } else if (option.prepend && firstChild) {
          // Fallback to `insertBefore` like IE not support `prepend`
          container.insertBefore(styleNode, firstChild);
        } else {
          container.appendChild(styleNode);
        }

        return styleNode;
      }
      var containerCache = new Map();

      function findExistNode(key) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var container = getContainer(option);
        return Array.from(containerCache.get(container).children).find(function (node) {
          return node.tagName === 'STYLE' && node.getAttribute(getMark(option)) === key;
        });
      }
      function updateCSS(css, key) {
        var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var _a, _b, _c;

        var container = getContainer(option); // Get real parent

        if (!containerCache.has(container)) {
          var placeholderStyle = injectCSS('', option);
          var parentNode = placeholderStyle.parentNode;
          containerCache.set(container, parentNode);
          parentNode.removeChild(placeholderStyle);
        }

        var existNode = findExistNode(key, option);

        if (existNode) {
          if (((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
            existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
          }

          if (existNode.innerHTML !== css) {
            existNode.innerHTML = css;
          }

          return existNode;
        }

        var newNode = injectCSS(css, option);
        newNode.setAttribute(getMark(option), key);
        return newNode;
      }

      var devWarning = (function (valid, component, message) {
        warningOnce(valid, "[ant-design-vue: ".concat(component, "] ").concat(message));
      });

      /* eslint-disable import/prefer-default-export, prefer-destructuring */
      var dynamicStyleMark = "-ant-".concat(Date.now(), "-").concat(Math.random());
      function registerTheme(globalPrefixCls, theme) {
        var variables = {};

        var formatColor = function formatColor(color, updater) {
          var clone = color.clone();
          clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
          return clone.toRgbString();
        };

        var fillColor = function fillColor(colorVal, type) {
          var baseColor = new TinyColor(colorVal);
          var colorPalettes = generate$1(baseColor.toRgbString());
          variables["".concat(type, "-color")] = formatColor(baseColor);
          variables["".concat(type, "-color-disabled")] = colorPalettes[1];
          variables["".concat(type, "-color-hover")] = colorPalettes[4];
          variables["".concat(type, "-color-active")] = colorPalettes[7];
          variables["".concat(type, "-color-outline")] = baseColor.clone().setAlpha(0.2).toRgbString();
          variables["".concat(type, "-color-deprecated-bg")] = colorPalettes[1];
          variables["".concat(type, "-color-deprecated-border")] = colorPalettes[3];
        }; // ================ Primary Color ================


        if (theme.primaryColor) {
          fillColor(theme.primaryColor, 'primary');
          var primaryColor = new TinyColor(theme.primaryColor);
          var primaryColors = generate$1(primaryColor.toRgbString()); // Legacy - We should use semantic naming standard

          primaryColors.forEach(function (color, index) {
            variables["primary-".concat(index + 1)] = color;
          }); // Deprecated

          variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, function (c) {
            return c.lighten(35);
          });
          variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, function (c) {
            return c.lighten(20);
          });
          variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, function (c) {
            return c.tint(20);
          });
          variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, function (c) {
            return c.tint(50);
          });
          variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, function (c) {
            return c.setAlpha(c.getAlpha() * 0.12);
          });
          var primaryActiveColor = new TinyColor(primaryColors[0]);
          variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, function (c) {
            return c.setAlpha(c.getAlpha() * 0.3);
          });
          variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, function (c) {
            return c.darken(2);
          });
        } // ================ Success Color ================


        if (theme.successColor) {
          fillColor(theme.successColor, 'success');
        } // ================ Warning Color ================


        if (theme.warningColor) {
          fillColor(theme.warningColor, 'warning');
        } // ================= Error Color =================


        if (theme.errorColor) {
          fillColor(theme.errorColor, 'error');
        } // ================= Info Color ==================


        if (theme.infoColor) {
          fillColor(theme.infoColor, 'info');
        } // Convert to css variables


        var cssList = Object.keys(variables).map(function (key) {
          return "--".concat(globalPrefixCls, "-").concat(key, ": ").concat(variables[key], ";");
        });

        if (canUseDom()) {
          updateCSS("\n  :root {\n    ".concat(cssList.join('\n'), "\n  }\n  "), "".concat(dynamicStyleMark, "-dynamic-theme"));
        } else {
          devWarning(false, 'ConfigProvider', 'SSR do not support dynamic theme with css variables.');
        }
      }

      var GlobalFormContextKey = Symbol('GlobalFormContextKey');
      var useProvideGlobalForm = function useProvideGlobalForm(state) {
        provide(GlobalFormContextKey, state);
      };
      var configProviderProps = function configProviderProps() {
        return {
          getTargetContainer: {
            type: Function
          },
          getPopupContainer: {
            type: Function
          },
          prefixCls: String,
          getPrefixCls: {
            type: Function
          },
          renderEmpty: {
            type: Function
          },
          transformCellText: {
            type: Function
          },
          csp: {
            type: Object,
            default: undefined
          },
          input: {
            type: Object
          },
          autoInsertSpaceInButton: {
            type: Boolean,
            default: undefined
          },
          locale: {
            type: Object,
            default: undefined
          },
          pageHeader: {
            type: Object
          },
          componentSize: {
            type: String
          },
          direction: {
            type: String
          },
          space: {
            type: Object
          },
          virtual: {
            type: Boolean,
            default: undefined
          },
          dropdownMatchSelectWidth: {
            type: [Number, Boolean],
            default: true
          },
          form: {
            type: Object,
            default: undefined
          },
          // internal use
          notUpdateGlobalConfig: Boolean
        };
      };

      var defaultPrefixCls = 'ant';

      function getGlobalPrefixCls() {
        return globalConfigForApi.prefixCls || defaultPrefixCls;
      }

      var globalConfigByCom = reactive({});
      var globalConfigBySet = reactive({}); // 权重最大

      var globalConfigForApi = reactive({});
      watchEffect(function () {
        _extends(globalConfigForApi, globalConfigByCom, globalConfigBySet);

        globalConfigForApi.prefixCls = getGlobalPrefixCls();

        globalConfigForApi.getPrefixCls = function (suffixCls, customizePrefixCls) {
          if (customizePrefixCls) return customizePrefixCls;
          return suffixCls ? "".concat(globalConfigForApi.prefixCls, "-").concat(suffixCls) : globalConfigForApi.prefixCls;
        };

        globalConfigForApi.getRootPrefixCls = function (rootPrefixCls, customizePrefixCls) {
          // Customize rootPrefixCls is first priority
          if (rootPrefixCls) {
            return rootPrefixCls;
          } // If Global prefixCls provided, use this


          if (globalConfigForApi.prefixCls) {
            return globalConfigForApi.prefixCls;
          } // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls


          if (customizePrefixCls && customizePrefixCls.includes('-')) {
            return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
          } // Fallback to default prefixCls


          return getGlobalPrefixCls();
        };
      });
      var stopWatchEffect;

      var setGlobalConfig = function setGlobalConfig(params) {
        if (stopWatchEffect) {
          stopWatchEffect();
        }

        stopWatchEffect = watchEffect(function () {
          _extends(globalConfigBySet, reactive(params));
        });

        if (params.theme) {
          registerTheme(getGlobalPrefixCls(), params.theme);
        }
      };

      var globalConfig = function globalConfig() {
        return {
          getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
            if (customizePrefixCls) return customizePrefixCls;
            return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
          },
          getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
            // Customize rootPrefixCls is first priority
            if (rootPrefixCls) {
              return rootPrefixCls;
            } // If Global prefixCls provided, use this


            if (globalConfigForApi.prefixCls) {
              return globalConfigForApi.prefixCls;
            } // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls


            if (customizePrefixCls && customizePrefixCls.includes('-')) {
              return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
            } // Fallback to default prefixCls


            return getGlobalPrefixCls();
          }
        };
      };
      var ConfigProvider = defineComponent({
        name: 'AConfigProvider',
        inheritAttrs: false,
        props: configProviderProps(),
        setup: function setup(props, _ref) {
          var slots = _ref.slots;

          var getPrefixCls = function getPrefixCls(suffixCls, customizePrefixCls) {
            var _props$prefixCls = props.prefixCls,
                prefixCls = _props$prefixCls === void 0 ? 'ant' : _props$prefixCls;
            if (customizePrefixCls) return customizePrefixCls;
            return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
          };

          var renderEmptyComponent = function renderEmptyComponent(name) {
            var renderEmpty$1 = props.renderEmpty || slots.renderEmpty || renderEmpty;
            return renderEmpty$1(name);
          };

          var getPrefixClsWrapper = function getPrefixClsWrapper(suffixCls, customizePrefixCls) {
            var prefixCls = props.prefixCls;
            if (customizePrefixCls) return customizePrefixCls;
            var mergedPrefixCls = prefixCls || getPrefixCls('');
            return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
          };

          var configProvider = reactive(_extends(_extends({}, props), {
            getPrefixCls: getPrefixClsWrapper,
            renderEmpty: renderEmptyComponent
          }));
          Object.keys(props).forEach(function (key) {
            watch(function () {
              return props[key];
            }, function () {
              configProvider[key] = props[key];
            });
          });

          if (!props.notUpdateGlobalConfig) {
            _extends(globalConfigByCom, configProvider);

            watch(configProvider, function () {
              _extends(globalConfigByCom, configProvider);
            });
          }

          var validateMessagesRef = computed(function () {
            var _a, _b; // Additional Form provider


            var validateMessages = {};

            if (props.locale) {
              validateMessages = ((_a = props.locale.Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || ((_b = defaultLocale.Form) === null || _b === void 0 ? void 0 : _b.defaultValidateMessages) || {};
            }

            if (props.form && props.form.validateMessages) {
              validateMessages = _extends(_extends({}, validateMessages), props.form.validateMessages);
            }

            return validateMessages;
          });
          useProvideGlobalForm({
            validateMessages: validateMessagesRef
          });
          provide('configProvider', configProvider);

          var renderProvider = function renderProvider(legacyLocale) {
            var _a;

            return createVNode(LocaleProvider$1, {
              "locale": props.locale || legacyLocale,
              "ANT_MARK__": ANT_MARK
            }, {
              default: function _default() {
                return [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)];
              }
            });
          };

          watchEffect(function () {
            if (props.direction) {
              message.config({
                rtl: props.direction === 'rtl'
              });
              notification.config({
                rtl: props.direction === 'rtl'
              });
            }
          });
          return function () {
            return createVNode(LocaleReceiver, {
              "children": function children(_, __, legacyLocale) {
                return renderProvider(legacyLocale);
              }
            }, null);
          };
        }
      });
      var defaultConfigProvider = reactive({
        getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
          if (customizePrefixCls) return customizePrefixCls;
          return suffixCls ? "ant-".concat(suffixCls) : 'ant';
        },
        renderEmpty: renderEmpty,
        direction: 'ltr'
      });
      ConfigProvider.config = setGlobalConfig;

      ConfigProvider.install = function (app) {
        app.component(ConfigProvider.name, ConfigProvider);
      };

      var useConfigInject = (function (name, props) {
        var configProvider = inject('configProvider', defaultConfigProvider);
        var prefixCls = computed(function () {
          return configProvider.getPrefixCls(name, props.prefixCls);
        });
        var direction = computed(function () {
          var _a;

          return (_a = props.direction) !== null && _a !== void 0 ? _a : configProvider.direction;
        });
        var rootPrefixCls = computed(function () {
          return configProvider.getPrefixCls();
        });
        var autoInsertSpaceInButton = computed(function () {
          return configProvider.autoInsertSpaceInButton;
        });
        var renderEmpty = computed(function () {
          return configProvider.renderEmpty;
        });
        var space = computed(function () {
          return configProvider.space;
        });
        var pageHeader = computed(function () {
          return configProvider.pageHeader;
        });
        var form = computed(function () {
          return configProvider.form;
        });
        var getTargetContainer = computed(function () {
          return props.getTargetContainer || configProvider.getTargetContainer;
        });
        var getPopupContainer = computed(function () {
          return props.getPopupContainer || configProvider.getPopupContainer;
        });
        var dropdownMatchSelectWidth = computed(function () {
          var _a;

          return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : configProvider.dropdownMatchSelectWidth;
        });
        var virtual = computed(function () {
          return (props.virtual === undefined ? configProvider.virtual !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
        });
        var size = computed(function () {
          return props.size || configProvider.componentSize;
        });
        var autocomplete = computed(function () {
          var _a;

          return props.autocomplete || ((_a = configProvider.input) === null || _a === void 0 ? void 0 : _a.autocomplete);
        });
        var csp = computed(function () {
          return configProvider.csp;
        });
        return {
          configProvider: configProvider,
          prefixCls: prefixCls,
          direction: direction,
          size: size,
          getTargetContainer: getTargetContainer,
          getPopupContainer: getPopupContainer,
          space: space,
          pageHeader: pageHeader,
          form: form,
          autoInsertSpaceInButton: autoInsertSpaceInButton,
          renderEmpty: renderEmpty,
          virtual: virtual,
          dropdownMatchSelectWidth: dropdownMatchSelectWidth,
          rootPrefixCls: rootPrefixCls,
          getPrefixCls: configProvider.getPrefixCls,
          autocomplete: autocomplete,
          csp: csp
        };
      });

      var START_EVENT_NAME_MAP = {
        transitionstart: {
          transition: 'transitionstart',
          WebkitTransition: 'webkitTransitionStart',
          MozTransition: 'mozTransitionStart',
          OTransition: 'oTransitionStart',
          msTransition: 'MSTransitionStart'
        },
        animationstart: {
          animation: 'animationstart',
          WebkitAnimation: 'webkitAnimationStart',
          MozAnimation: 'mozAnimationStart',
          OAnimation: 'oAnimationStart',
          msAnimation: 'MSAnimationStart'
        }
      };
      var END_EVENT_NAME_MAP = {
        transitionend: {
          transition: 'transitionend',
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'mozTransitionEnd',
          OTransition: 'oTransitionEnd',
          msTransition: 'MSTransitionEnd'
        },
        animationend: {
          animation: 'animationend',
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          OAnimation: 'oAnimationEnd',
          msAnimation: 'MSAnimationEnd'
        }
      };
      var startEvents = [];
      var endEvents = [];

      function detectEvents() {
        var testEl = document.createElement('div');
        var style = testEl.style;

        if (!('AnimationEvent' in window)) {
          delete START_EVENT_NAME_MAP.animationstart.animation;
          delete END_EVENT_NAME_MAP.animationend.animation;
        }

        if (!('TransitionEvent' in window)) {
          delete START_EVENT_NAME_MAP.transitionstart.transition;
          delete END_EVENT_NAME_MAP.transitionend.transition;
        }

        function process(EVENT_NAME_MAP, events) {
          for (var baseEventName in EVENT_NAME_MAP) {
            if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
              var baseEvents = EVENT_NAME_MAP[baseEventName];

              for (var styleName in baseEvents) {
                if (styleName in style) {
                  events.push(baseEvents[styleName]);
                  break;
                }
              }
            }
          }
        }

        process(START_EVENT_NAME_MAP, startEvents);
        process(END_EVENT_NAME_MAP, endEvents);
      }

      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        detectEvents();
      }

      function addEventListener(node, eventName, eventListener) {
        node.addEventListener(eventName, eventListener, false);
      }

      function removeEventListener(node, eventName, eventListener) {
        node.removeEventListener(eventName, eventListener, false);
      }

      var TransitionEvents = {
        // Start events
        startEvents: startEvents,
        addStartEventListener: function addStartEventListener(node, eventListener) {
          if (startEvents.length === 0) {
            setTimeout(eventListener, 0);
            return;
          }

          startEvents.forEach(function (startEvent) {
            addEventListener(node, startEvent, eventListener);
          });
        },
        removeStartEventListener: function removeStartEventListener(node, eventListener) {
          if (startEvents.length === 0) {
            return;
          }

          startEvents.forEach(function (startEvent) {
            removeEventListener(node, startEvent, eventListener);
          });
        },
        // End events
        endEvents: endEvents,
        addEndEventListener: function addEndEventListener(node, eventListener) {
          if (endEvents.length === 0) {
            setTimeout(eventListener, 0);
            return;
          }

          endEvents.forEach(function (endEvent) {
            addEventListener(node, endEvent, eventListener);
          });
        },
        removeEndEventListener: function removeEndEventListener(node, eventListener) {
          if (endEvents.length === 0) {
            return;
          }

          endEvents.forEach(function (endEvent) {
            removeEventListener(node, endEvent, eventListener);
          });
        }
      };
      var TransitionEvents$1 = TransitionEvents;

      var styleForPesudo; // Where el is the DOM element you'd like to test for visibility

      function isHidden(element) {
        if (process.env.NODE_ENV === 'test') {
          return false;
        }

        return !element || element.offsetParent === null;
      }

      function isNotGrey(color) {
        // eslint-disable-next-line no-useless-escape
        var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);

        if (match && match[1] && match[2] && match[3]) {
          return !(match[1] === match[2] && match[2] === match[3]);
        }

        return true;
      }

      var Wave = defineComponent({
        name: 'Wave',
        props: {
          insertExtraNode: Boolean,
          disabled: Boolean
        },
        setup: function setup(props, _ref) {
          var slots = _ref.slots,
              expose = _ref.expose;
          var instance = getCurrentInstance();

          var _useConfigInject = useConfigInject('', props),
              csp = _useConfigInject.csp,
              prefixCls = _useConfigInject.prefixCls;

          expose({
            csp: csp
          });
          var eventIns = null;
          var clickWaveTimeoutId = null;
          var animationStartId = null;
          var animationStart = false;
          var extraNode = null;
          var isUnmounted = false;

          var onTransitionStart = function onTransitionStart(e) {
            if (isUnmounted) return;
            var node = findDOMNode(instance);

            if (!e || e.target !== node) {
              return;
            }

            if (!animationStart) {
              resetEffect(node);
            }
          };

          var onTransitionEnd = function onTransitionEnd(e) {
            if (!e || e.animationName !== 'fadeEffect') {
              return;
            }

            resetEffect(e.target);
          };

          var getAttributeName = function getAttributeName() {
            var insertExtraNode = props.insertExtraNode;
            return insertExtraNode ? "".concat(prefixCls.value, "-click-animating") : "".concat(prefixCls.value, "-click-animating-without-extra-node");
          };

          var onClick = function onClick(node, waveColor) {
            var _a;

            var insertExtraNode = props.insertExtraNode,
                disabled = props.disabled;

            if (disabled || !node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
              return;
            }

            extraNode = document.createElement('div');
            extraNode.className = "".concat(prefixCls.value, "-click-animating-node");
            var attributeName = getAttributeName();
            node.removeAttribute(attributeName);
            node.setAttribute(attributeName, 'true'); // Not white or transparent or grey

            styleForPesudo = styleForPesudo || document.createElement('style');

            if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
            waveColor !== 'transparent') {
              // Add nonce if CSP exist
              if ((_a = csp.value) === null || _a === void 0 ? void 0 : _a.nonce) {
                styleForPesudo.nonce = csp.value.nonce;
              }

              extraNode.style.borderColor = waveColor;
              styleForPesudo.innerHTML = "\n        [".concat(prefixCls.value, "-click-animating-without-extra-node='true']::after, .").concat(prefixCls.value, "-click-animating-node {\n          --antd-wave-shadow-color: ").concat(waveColor, ";\n        }");

              if (!document.body.contains(styleForPesudo)) {
                document.body.appendChild(styleForPesudo);
              }
            }

            if (insertExtraNode) {
              node.appendChild(extraNode);
            }

            TransitionEvents$1.addStartEventListener(node, onTransitionStart);
            TransitionEvents$1.addEndEventListener(node, onTransitionEnd);
          };

          var resetEffect = function resetEffect(node) {
            if (!node || node === extraNode || !(node instanceof Element)) {
              return;
            }

            var insertExtraNode = props.insertExtraNode;
            var attributeName = getAttributeName();
            node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466

            if (styleForPesudo) {
              styleForPesudo.innerHTML = '';
            }

            if (insertExtraNode && extraNode && node.contains(extraNode)) {
              node.removeChild(extraNode);
            }

            TransitionEvents$1.removeStartEventListener(node, onTransitionStart);
            TransitionEvents$1.removeEndEventListener(node, onTransitionEnd);
          };

          var bindAnimationEvent = function bindAnimationEvent(node) {
            if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
              return;
            }

            var newClick = function newClick(e) {
              // Fix radio button click twice
              if (e.target.tagName === 'INPUT' || isHidden(e.target)) {
                return;
              }

              resetEffect(node); // Get wave color from target

              var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
              getComputedStyle(node).getPropertyValue('border-color') || getComputedStyle(node).getPropertyValue('background-color');
              clickWaveTimeoutId = setTimeout(function () {
                return onClick(node, waveColor);
              }, 0);
              wrapperRaf.cancel(animationStartId);
              animationStart = true; // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.

              animationStartId = wrapperRaf(function () {
                animationStart = false;
              }, 10);
            };

            node.addEventListener('click', newClick, true);
            return {
              cancel: function cancel() {
                node.removeEventListener('click', newClick, true);
              }
            };
          };

          onMounted(function () {
            nextTick(function () {
              var node = findDOMNode(instance);

              if (node.nodeType !== 1) {
                return;
              }

              eventIns = bindAnimationEvent(node);
            });
          });
          onBeforeUnmount(function () {
            if (eventIns) {
              eventIns.cancel();
            }

            clearTimeout(clickWaveTimeoutId);
            isUnmounted = true;
          });
          return function () {
            var _a;

            return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
          };
        }
      });

      var buttonProps = function buttonProps() {
        return {
          prefixCls: String,
          type: String,
          htmlType: {
            type: String,
            default: 'button'
          },
          shape: {
            type: String
          },
          size: {
            type: String
          },
          loading: {
            type: [Boolean, Object],
            default: function _default() {
              return false;
            }
          },
          disabled: {
            type: Boolean,
            default: undefined
          },
          ghost: {
            type: Boolean,
            default: undefined
          },
          block: {
            type: Boolean,
            default: undefined
          },
          danger: {
            type: Boolean,
            default: undefined
          },
          icon: PropTypes$1.any,
          href: String,
          target: String,
          title: String,
          onClick: {
            type: Function
          },
          onMousedown: {
            type: Function
          }
        };
      };
      var buttonTypes = buttonProps;

      var getCollapsedWidth = function getCollapsedWidth(node) {
        if (node) {
          node.style.width = '0px';
          node.style.opacity = '0';
          node.style.transform = 'scale(0)';
        }
      };

      var getRealWidth = function getRealWidth(node) {
        nextTick(function () {
          if (node) {
            node.style.width = "".concat(node.scrollWidth, "px");
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
          }
        });
      };

      var resetStyle = function resetStyle(node) {
        if (node && node.style) {
          node.style.width = null;
          node.style.opacity = null;
          node.style.transform = null;
        }
      };

      var LoadingIcon = defineComponent({
        name: 'LoadingIcon',
        props: {
          prefixCls: String,
          loading: [Boolean, Object],
          existIcon: Boolean
        },
        setup: function setup(props) {
          return function () {
            var existIcon = props.existIcon,
                prefixCls = props.prefixCls,
                loading = props.loading;

            if (existIcon) {
              return createVNode("span", {
                "class": "".concat(prefixCls, "-loading-icon")
              }, [createVNode(LoadingOutlined$1, null, null)]);
            }

            var visible = !!loading;
            return createVNode(Transition$1, {
              "name": "".concat(prefixCls, "-loading-icon-motion"),
              "onBeforeEnter": getCollapsedWidth,
              "onEnter": getRealWidth,
              "onAfterEnter": resetStyle,
              "onBeforeLeave": getRealWidth,
              "onLeave": function onLeave(node) {
                setTimeout(function () {
                  getCollapsedWidth(node);
                });
              },
              "onAfterLeave": resetStyle
            }, {
              default: function _default() {
                return [visible ? createVNode("span", {
                  "class": "".concat(prefixCls, "-loading-icon")
                }, [createVNode(LoadingOutlined$1, null, null)]) : null];
              }
            });
          };
        }
      });

      var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
      var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

      function isUnborderedButtonType(type) {
        return type === 'text' || type === 'link';
      }
      var Button = defineComponent({
        name: 'AButton',
        inheritAttrs: false,
        __ANT_BUTTON: true,
        props: initDefaultProps$1(buttonTypes(), {
          type: 'default'
        }),
        slots: ['icon'],
        // emits: ['click', 'mousedown'],
        setup: function setup(props, _ref) {
          var slots = _ref.slots,
              attrs = _ref.attrs,
              emit = _ref.emit;

          var _useConfigInject = useConfigInject('btn', props),
              prefixCls = _useConfigInject.prefixCls,
              autoInsertSpaceInButton = _useConfigInject.autoInsertSpaceInButton,
              direction = _useConfigInject.direction,
              size = _useConfigInject.size;

          var buttonNodeRef = ref(null);
          var delayTimeoutRef = ref(undefined);
          var isNeedInserted = false;
          var innerLoading = ref(false);
          var hasTwoCNChar = ref(false);
          var autoInsertSpace = computed(function () {
            return autoInsertSpaceInButton.value !== false;
          }); // =============== Update Loading ===============

          var loadingOrDelay = computed(function () {
            return _typeof(props.loading) === 'object' && props.loading.delay ? props.loading.delay || true : !!props.loading;
          });
          watch(loadingOrDelay, function (val) {
            clearTimeout(delayTimeoutRef.value);

            if (typeof loadingOrDelay.value === 'number') {
              delayTimeoutRef.value = setTimeout(function () {
                innerLoading.value = val;
              }, loadingOrDelay.value);
            } else {
              innerLoading.value = val;
            }
          }, {
            immediate: true
          });
          var classes = computed(function () {
            var _ref2;

            var type = props.type,
                _props$shape = props.shape,
                shape = _props$shape === void 0 ? 'default' : _props$shape,
                ghost = props.ghost,
                block = props.block,
                danger = props.danger;
            var pre = prefixCls.value;
            var sizeClassNameMap = {
              large: 'lg',
              small: 'sm',
              middle: undefined
            };
            var sizeFullname = size.value;
            var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
            return _ref2 = {}, _defineProperty$d(_ref2, "".concat(pre), true), _defineProperty$d(_ref2, "".concat(pre, "-").concat(type), type), _defineProperty$d(_ref2, "".concat(pre, "-").concat(shape), shape !== 'default' && shape), _defineProperty$d(_ref2, "".concat(pre, "-").concat(sizeCls), sizeCls), _defineProperty$d(_ref2, "".concat(pre, "-loading"), innerLoading.value), _defineProperty$d(_ref2, "".concat(pre, "-background-ghost"), ghost && !isUnborderedButtonType(type)), _defineProperty$d(_ref2, "".concat(pre, "-two-chinese-chars"), hasTwoCNChar.value && autoInsertSpace.value), _defineProperty$d(_ref2, "".concat(pre, "-block"), block), _defineProperty$d(_ref2, "".concat(pre, "-dangerous"), !!danger), _defineProperty$d(_ref2, "".concat(pre, "-rtl"), direction.value === 'rtl'), _ref2;
          });

          var fixTwoCNChar = function fixTwoCNChar() {
            // Fix for HOC usage like <FormatMessage />
            var node = buttonNodeRef.value;

            if (!node || autoInsertSpaceInButton.value === false) {
              return;
            }

            var buttonText = node.textContent;

            if (isNeedInserted && isTwoCNChar(buttonText)) {
              if (!hasTwoCNChar.value) {
                hasTwoCNChar.value = true;
              }
            } else if (hasTwoCNChar.value) {
              hasTwoCNChar.value = false;
            }
          };

          var handleClick = function handleClick(event) {
            // https://github.com/ant-design/ant-design/issues/30207
            if (innerLoading.value || props.disabled) {
              event.preventDefault();
              return;
            }

            emit('click', event);
          };

          var insertSpace = function insertSpace(child, needInserted) {
            var SPACE = needInserted ? ' ' : '';

            if (child.type === Text) {
              var text = child.children.trim();

              if (isTwoCNChar(text)) {
                text = text.split('').join(SPACE);
              }

              return createVNode("span", null, [text]);
            }

            return child;
          };

          watchEffect(function () {
            devWarning(!(props.ghost && isUnborderedButtonType(props.type)), 'Button', "`link` or `text` button can't be a `ghost` button.");
          });
          onMounted(fixTwoCNChar);
          onUpdated(fixTwoCNChar);
          onBeforeUnmount(function () {
            delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
          });
          return function () {
            var _a, _b;

            var _props$icon = props.icon,
                icon = _props$icon === void 0 ? (_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$icon;
            var children = flattenChildren((_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots));
            isNeedInserted = children.length === 1 && !icon && !isUnborderedButtonType(props.type);
            var type = props.type,
                htmlType = props.htmlType,
                disabled = props.disabled,
                href = props.href,
                title = props.title,
                target = props.target,
                onMousedown = props.onMousedown;
            var iconType = innerLoading.value ? 'loading' : icon;

            var buttonProps = _extends(_extends({}, attrs), {
              title: title,
              disabled: disabled,
              class: [classes.value, attrs.class, _defineProperty$d({}, "".concat(prefixCls.value, "-icon-only"), children.length === 0 && !!iconType)],
              onClick: handleClick,
              onMousedown: onMousedown
            }); // https://github.com/vueComponent/ant-design-vue/issues/4930


            if (!disabled) {
              delete buttonProps.disabled;
            }

            var iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
              "existIcon": !!icon,
              "prefixCls": prefixCls.value,
              "loading": !!innerLoading.value
            }, null);
            var kids = children.map(function (child) {
              return insertSpace(child, isNeedInserted && autoInsertSpace.value);
            });

            if (href !== undefined) {
              return createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
                "href": href,
                "target": target,
                "ref": buttonNodeRef
              }), [iconNode, kids]);
            }

            var buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
              "ref": buttonNodeRef,
              "type": htmlType
            }), [iconNode, kids]);

            if (isUnborderedButtonType(type)) {
              return buttonNode;
            }

            return createVNode(Wave, {
              "ref": "wave",
              "disabled": !!innerLoading.value
            }, {
              default: function _default() {
                return [buttonNode];
              }
            });
          };
        }
      });

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var UnreachableException = /*#__PURE__*/_createClass(function UnreachableException(value) {
        _classCallCheck(this, UnreachableException);

        this.error = new Error("unreachable case: ".concat(JSON.stringify(value)));
      });

      var buttonGroupProps = function buttonGroupProps() {
        return {
          prefixCls: String,
          size: {
            type: String
          }
        };
      };
      var ButtonGroup = defineComponent({
        name: 'AButtonGroup',
        props: buttonGroupProps(),
        setup: function setup(props, _ref) {
          var slots = _ref.slots;

          var _useConfigInject = useConfigInject('btn-group', props),
              prefixCls = _useConfigInject.prefixCls,
              direction = _useConfigInject.direction;

          var classes = computed(function () {
            var _ref2;

            var size = props.size; // large => lg
            // small => sm

            var sizeCls = '';

            switch (size) {
              case 'large':
                sizeCls = 'lg';
                break;

              case 'small':
                sizeCls = 'sm';
                break;

              case 'middle':
              case undefined:
                break;

              default:
                // eslint-disable-next-line no-console
                console.warn(new UnreachableException(size).error);
            }

            return _ref2 = {}, _defineProperty$d(_ref2, "".concat(prefixCls.value), true), _defineProperty$d(_ref2, "".concat(prefixCls.value, "-").concat(sizeCls), sizeCls), _defineProperty$d(_ref2, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _ref2;
          });
          return function () {
            var _a;

            return createVNode("div", {
              "class": classes.value
            }, [flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
          };
        }
      });

      Button.Group = ButtonGroup;
      /* istanbul ignore next */

      Button.install = function (app) {
        app.component(Button.name, Button);
        app.component(ButtonGroup.name, ButtonGroup);
        return app;
      };

      var script = exports('default', defineComponent({
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

      }));

      script.__file = "test/Button.vue";

    })
  };
}));
//# sourceMappingURL=index.system.js.map
