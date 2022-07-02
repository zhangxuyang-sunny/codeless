<script lang="tsx">
import { defineComponent, unref } from "vue";
import IframeTools from "@/classes/IframeTools";
import { NodeTypes, PageNode } from "packages/x-core";

import Simulator from "./classes/Simulator";
export default defineComponent({
  name: "Simulator",
  setup() {
    const mount = async (el: Element) => {
      const {
        createApp, //
        defineAsyncComponent,
        h,
        ref
      } = await System.import<typeof import("vue")>("vue");

      const RemoteEntryComponent = defineAsyncComponent(() => System.import("RendererEntry"));

      const schema = IframeTools?.getSchema();

      const pageNode = new PageNode();

      if (schema && schema.type === NodeTypes.Page) {
        pageNode.setSchema(schema);
      }

      const app = createApp({
        setup() {
          const simulator = new Simulator();
          const schema = ref(pageNode.getValue());

          IframeTools.update.subscribe(s => {
            const newValue = ref(pageNode.setSchema(s).getValue());
            schema.value = unref(newValue.value);
          });

          simulator.click.subscribe(console.log);
          return () => {
            const AppNode = h(RemoteEntryComponent, {
              data: schema.value,
              onAsyncComponentMounted: (el: Element) => {
                /**
                 * @todo 后面使用事件通知
                 */
                setTimeout(() => {
                  simulator.bindEvent(el);
                }, 200);
              }
            });
            return AppNode;
          };
        }
      });

      app.mount(el);
    };
    return () => (
      <div
        ref={el => {
          if (el && el instanceof Element) {
            mount(el);
          }
        }}
      ></div>
    );
  }
});
</script>
