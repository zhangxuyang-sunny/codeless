import {
  Application,
  Component,
  SchemaBuilder,
  CallExpressionBuilder,
  StringExpressionBuilder
} from "packages/schema/src/index";

const button_loading_1: Component = SchemaBuilder.Component.set("id", "button_loading_1")
  .set("src", `components/test/ButtonLoading.js`)
  .addJSStringProp("name", "点击触发 button_loading_2:toggle_loading 事件")
  .addJSStringProp("type", "primary")
  .addEvent("click", {
    target: [
      {
        event: "button_loading_2:toggle_loading",
        params: null
      },
      {
        event: "button_loading_3:toggle_loading",
        params: null
      }
    ],
    invoke: null
  })
  .end();

const button_loading_2: Component = SchemaBuilder.Component.set("id", "button_loading_2")
  .set("src", `components/test/ButtonLoading.js`)
  .addJSStringProp("name", "点击给组件 button_loading_1 发送 toggle_loading 事件")
  .addEvent("click", {
    target: [
      {
        event: "button_loading_1:toggle_loading",
        params: [
          new CallExpressionBuilder()
            .setTarget("console")
            .appendArgument(new StringExpressionBuilder().setValue("log").end())
            .appendArgument(new CallExpressionBuilder().setTarget("getCurrentArguments").end())
            .appendArgument(new StringExpressionBuilder().setValue("第n个参数").end())
            .end()
        ]
      }
    ],
    invoke: null
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
  // 全局监听【按钮1】的 toggle_loading 事件，去触发【按钮3】的 toggle_loading 事件
  .addListener({
    event: "button_loading_1:toggle_loading",
    target: [
      {
        event: "button_loading_3:toggle_loading",
        params: [
          new CallExpressionBuilder()
            .setTarget("console")
            .appendArgument(new StringExpressionBuilder().setValue("log").end())
            .appendArgument(new CallExpressionBuilder().setTarget("getCurrentThis").end())
            .appendArgument(new StringExpressionBuilder().setValue("this").end())
            .end(),
          new CallExpressionBuilder()
            .setTarget("console")
            .appendArgument(
              new StringExpressionBuilder()
                .setValue("button_loading_3 监听到 button_loading_1:toggle_loading")
                .end()
            )
            .appendArgument(new CallExpressionBuilder().setTarget("getCurrentArguments").end())
            .end()
        ]
        // params: SchemaBuilder.JsFunction.setValue(
        //   `function (...args) {
        //       console.log('this', this);
        //       console.log("button_loading_3 监听到 button_loading_1:toggle_loading", { args });
        //       return args;
        //     }`
        // ).end()
      }
    ],
    invoke: null,
    once: false
  })
  .end();

export { emitListenerSchema };

console.log({ emitListenerSchema });
