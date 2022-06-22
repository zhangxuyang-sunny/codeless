<script lang="tsx">
import { defineComponent, inject, Ref } from "vue";
import { remotePackages } from "@/utils/common";
import { PageNode, PageSchema } from "packages/x-nodes/nodes/PageNode";
import loadRemoteComponent from "packages/x-shared/utils/loadRemoteComponent";

const RENDERER_ID = "__renderer_vue_page__";
export default defineComponent({
  setup() {
    const schemaRef = inject<Ref<PageSchema>>("schemaRef");

    const createPageApp = async (schema: PageSchema) => {
      const vue = await remotePackages.vue();
      const page = new PageNode().setSchema(schema);

      if (process.env.NODE_ENV === "development") {
        console.log("单页面配置schema", schema);
        console.log("单页面配置实例", page);
        console.log("单页面配置运行时", page.getValue());
      }

      const app = vue.createApp({
        name: "page",
        render() {
          return vue.h(loadRemoteComponent("RendererEntry"), { data: page.getValue() });
        }
      });

      return app;
    };
    return () => (
      <div
        id={RENDERER_ID}
        ref={async el => {
          if (!el || !schemaRef?.value) return;
          const app = await createPageApp(schemaRef.value);
          if (el instanceof Element) {
            app.mount(el);
          } else {
            app.mount(`#${RENDERER_ID}`);
          }
        }}
      />
    );
  }
});
</script>
