import { Component, SchemaBuilder } from "packages/schema";

const button: Component = SchemaBuilder.Component.setId("button")
  .setSrc("/static/components/arco/Button.js")
  .set("props", {
    type: SchemaBuilder.JsExpression.setValue("'primary'").end()
  })
  .end();

export const Container = SchemaBuilder.Component.setId("base-example")
  .setSrc("/static/components/common/Container.js")
  .setSlots("default", [button])
  .end();

export const baseExample = SchemaBuilder.Application.setFramework("react")
  .addPage({ path: "/", component: button })
  .addDataset({
    name: "test",
    define: SchemaBuilder.JsExpression.setValue(
      `{
          name: "test",
          initialState: {
            loading: false
          },
          reducers: {
            openLoading(state) {
              state.loading = true;
            },
            closeLoading(state) {
              state.loading = false;
            }
          }
      }`
    ).end()
  })
  .end();

export default baseExample;
