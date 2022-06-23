<script lang="tsx">
import { defineComponent, inject, Ref } from "vue";
import { remotePackages } from "@/utils/common";
import { PageNode, PageSchema } from "packages/x-nodes/dist";
import loadRemoteComponent from "packages/x-shared/utils/loadRemoteComponent";

const RENDERER_ID = "__renderer_vue_page__";
export default defineComponent({
  name: "RendererPage",
  setup() {
    const schemaRef = inject<Ref<PageSchema>>("schemaRef");

    const createApp = async () => {
      const vue = await remotePackages.vue();
      return vue.createApp({
        name: "RendererPageApp",
        setup() {
          // Loading 状态
          if (!schemaRef?.value) {
            return () => vue.h("div", "loading....");
          }
          // 计算 schema 数据
          const data = vue.computed(() => {
            const page = new PageNode().setSchema(schemaRef.value);
            if (process.env.NODE_ENV === "development") {
              console.log("单页面配置schema", schemaRef.value);
              console.log("单页面配置实例", page);
              console.log("单页面配置运行时", page.getValue());
            }
            return page.getValue();
          });
          return () => vue.h(loadRemoteComponent("RendererEntry"), { data: data.value });
        }
      });
    };

    return () => (
      <div
        id={RENDERER_ID}
        ref={async el => {
          if (!el) return;
          const app = await createApp();
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
