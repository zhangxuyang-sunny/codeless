System.register(["vue"],(function(t,e){var r={};return{setters:[function(t){r.createVNode=t.createVNode,r.defineAsyncComponent=t.defineAsyncComponent,r.defineComponent=t.defineComponent,r.inject=t.inject,r.mergeProps=t.mergeProps,r.reactive=t.reactive,r.unref=t.unref}],execute:function(){t((()=>{var t={4173:(t,e,r)=>{t.exports=r(27801)},27801:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n=l;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return A()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var u=f(t,e,r);if("normal"===u.type){if(n=r.done?y:p,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l="suspendedStart",p="suspendedYield",h="executing",y="completed",v={};function d(){}function m(){}function g(){}var w={};u(w,i,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(_([])));x&&x!==r&&n.call(x,i)&&(w=x);var O=g.prototype=d.prototype=Object.create(w);function j(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var u=f(t[o],t,i);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(l).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function _(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:A}}function A(){return{value:e,done:!0}}return m.prototype=g,u(O,"constructor",g),u(g,"constructor",m),m.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},j(E.prototype),u(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(O),u(O,c,"Generator"),u(O,i,(function(){return this})),u(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:_(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}},44091:t=>{"use strict";t.exports=r}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};return(()=>{"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function e(e,r){return function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,r)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function c(t){i(a,n,o,c,u,"next",t)}function u(t){i(a,n,o,c,u,"throw",t)}c(void 0)}))}}n.r(o),n.d(o,{default:()=>y});var c=n(44091),u=n(4173),s=n.n(u);function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var p=function(){var t=a(s().mark((function t(e){var r,n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,System.import(e);case 2:if(r=t.sent,n=r.default||r.config){t.next=6;break}throw new Error("[FetchConfig]: 未识别到正确的配置文件，请检查是否使用了顶层`await`或未使用以下形式导出：\n      1. `export default config`\n      2. `export { config }`");case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();const h=(0,c.defineComponent)({name:"RendererEntry",props:{url:{type:String,default:""},data:{type:Object,default:null}},setup:function(t){var r=(0,c.inject)("globalProperties"),n=function t(n){var o,i,u=(o=n.src,console.log("加载组件 src=".concat(o)),(0,c.defineAsyncComponent)({errorComponent:function(){return"加载错误"},loader:(i=a(s().mark((function t(){var e,r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,System.import(o);case 2:return e=t.sent,r=e.default,t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)}))),function(){return i.apply(this,arguments)}),onError:function(t,e){console.error(t),console.error("[loadRemoteModule] 远程组件加载失败, src=".concat(o))}})),f=Object.keys(n.slots).reduce((function(e,r){var o,i=(null===(o=n.slots[r])||void 0===o?void 0:o.map(t))||[];return e[r]=function(){return i.map((function(t){return(0,c.createVNode)(t,null,null)}))},e}),{}),p=(0,c.reactive)(l(l({},n.props),{},{key:n.id})),h=(0,c.reactive)((0,c.unref)(n.style)),y=(0,c.reactive)((0,c.unref)(n.commonProps)),v=n.emits.reduce((function(t,n){return t["on".concat(n.event.replace(/^\S/,(function(t){return t.toUpperCase()})))]=a(s().mark((function t(){var o,i,c,u=arguments;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(o=u.length,i=new Array(o),c=0;c<o;c++)i[c]=u[c];if((n.target||[]).forEach(function(){var t=a(s().mark((function t(n){var o,a,c,u;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=e(n,2),a=o[0],!((c=o[1])instanceof Function)){t.next=5;break}return t.next=4,c.apply(void 0,i);case 4:u=t.sent;case 5:null==r||r.$events.emit(a,u);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),!(n.invoke instanceof Function)){t.next=5;break}return t.next=5,n.invoke.apply(n,i);case 5:case"end":return t.stop()}}),t)}))),t}),{});return function(){return"if"in y&&!y.if?null:("hidden"in y&&y.hidden&&(h.display="none"),"show"in y&&y.show&&(h.display="unset"),(0,c.createVNode)(u,(0,c.mergeProps)(p,v,{style:h}),f))}},o=(0,c.defineAsyncComponent)(a(s().mark((function e(){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.url){e.next=6;break}return e.next=3,p(t.url);case 3:e.t0=e.sent,e.next=7;break;case 6:e.t0=t.data;case 7:if(r=e.t0,console.log("config:",r),r&&0!==Object.keys(r).length){e.next=11;break}return e.abrupt("return",(function(){return null}));case 11:return e.abrupt("return",n(r));case 12:case"end":return e.stop()}}),e)}))));return function(){return(0,c.createVNode)(o,null,null)}}}),y=h})(),o})())}}}));
//# sourceMappingURL=RendererEntry.js.map