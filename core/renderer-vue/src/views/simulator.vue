<script lang="tsx">
import "@lowcode/types/src/renderer-api";
import { defineComponent, ref, shallowRef, watch } from "vue";
import { IApplicationSchema } from "@lowcode/schema";
import { ApplicationRuntime } from "../core/schema";
import { loadRemotePackages } from "../utils/common";
import { defineApplication } from "../core/defineApplication";
import { ApplicationTransformer } from "../core/transformer";
// import { applicationSchema } from "../draft/application";
// import Renderer from "../components/Renderer.vue";

const Application = defineApplication({
  vue: await System.import("vue"),
  vueRouter: await System.import("vue-router"),
  pinia: await System.import("pinia")
});

export default defineComponent({
  name: "Simulator",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<IApplicationSchema>();
    const application = shallowRef<ApplicationRuntime>();

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
    });

    // 注册渲染器 api
    window.__X_RENDERER_API__.updateRoute = name => {
      routeName.value = name;
      console.log("update router:", name);
    };
    window.__X_RENDERER_API__.updateSchema = data => {
      schema.value = data;
      console.log("update application:", data);
    };

    watch([initialized, schema], () => {
      if (initialized.value && schema.value) {
        application.value = new ApplicationTransformer(schema.value).runtime();
      }
    });

    // /**
    //  * mock 数据
    //  */
    // schema.value = applicationSchema;

    // /** */

    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!schema.value) {
        return <div class="loading">No configuration</div>;
      }
      if (!application.value) {
        return <div class="loading">Application is not initialized</div>;
      }
      return (
        <Application //
          baseUrl="/renderer/vue/simulator.html"
          routeName={routeName.value}
          schema={application.value}
        />
      );
    };
  }
});
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
