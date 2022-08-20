import { Application, Component, SchemaBuilder } from "packages/schema/src/index";

const button_loading_1: Component = SchemaBuilder.Component.set("id", "button_loading_1")
  .set("src", `components/test/ButtonLoading.js`)
  .addJSStringProp("name", "点击触发 button_loading_2:toggle_loading 事件")
  .addJSStringProp("type", "primary")
  .addEvent("click", {
    target: [
      {
        event: "button_loading_2:toggle_loading",
        params: null,
        once: false
      },
      {
        event: "button_loading_3:toggle_loading",
        params: null,
        once: false
      }
    ],
    invoke: null,
    once: false
  })
  .end();

const button_loading_2: Component = SchemaBuilder.Component.set("id", "button_loading_2")
  .set("src", `components/test/ButtonLoading.js`)
  .addJSStringProp("name", "点击给组件 button_loading_1 发送 toggle_loading 事件")
  .addEvent("click", {
    target: [
      {
        event: "button_loading_1:toggle_loading",
        params: SchemaBuilder.JsFunction.setValue(
          `function () { 
              console.log('context', context);
              return [...context.current, '第n个参数'] 
            }`
        ).end(),
        once: false
      }
    ],
    invoke: null,
    once: false
  })
  .end();

const button_loading_3: Component = SchemaBuilder.Component.set("id", "button_loading_3")
  .set("src", `components/test/ButtonLoading.js`)
  .addJSStringProp("name", "按钮3")
  .end();

const container: Component = SchemaBuilder.Component.set("id", "container")
  .set("src", `components/common/EmptyContainer.js`)
  .set("slots", {
    default: [button_loading_1, button_loading_2, button_loading_3]
  })
  .end();

const emitListenerSchema: Application = SchemaBuilder.Application.set("router", {
  base: "/",
  mode: "history",
  meta: {}
})
  .addPage({
    path: "/",
    component: container
  })
  .addListener({
    event: "button_loading_1:toggle_loading",
    target: [
      {
        event: "button_loading_3:toggle_loading",
        params: SchemaBuilder.JsFunction.setValue(
          `function (...args) {
              console.log({args})
              console.log("button_loading_3 监听到 button_loading_1:toggle_loading", context)
              return args
            }`
        ).end(),
        once: false
      }
    ],
    invoke: null,
    once: false
  })
  .end();

export { emitListenerSchema };

console.log({ emitListenerSchema });
