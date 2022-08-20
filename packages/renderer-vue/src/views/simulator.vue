<script lang="tsx">
import "@economizer/types/src/renderer-api";
import { defineComponent, ref, shallowRef, watch } from "vue";
import { Application } from "@economizer/schema";
import { ApplicationRuntime } from "../core/runtime-schema";
import { loadRemotePackages } from "../utils/common";
import { defineApplication } from "../core/defineApplication";
import { ApplicationTransformer } from "../core/transformer";
import { emitListenerSchema } from "../example/emit-listener";

export default defineComponent({
  name: "Simulator",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<Application>();
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
        console.log({ runtime: application.value });
      }
    });

    /**
     * mock 数据
     */
    schema.value = emitListenerSchema;

    // setTimeout(() => {
    //   schema.value = applicationSchema2;
    // }, 1000);

    /** */
    const App = defineApplication();

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
        <App //
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
