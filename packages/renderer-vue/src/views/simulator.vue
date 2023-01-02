<script lang="tsx">
import "@codeless/types/src/renderer-api";
import type { Application } from "@codeless/schema";
import { defineComponent, ref, shallowRef } from "vue";
import { loadRemotePackages } from "../utils/common";
import { defineApplication } from "../core/defineApplication";
// import { emitListenerSchema } from "../example/emit-listener";
// import { test } from "../example/test";
import { piniaPropsReactive } from "../example/pinia-props-reactive";

export default defineComponent({
  name: "Simulator",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<Application>();

    loadRemotePackages().then(() => {
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

    /**
     * mock 数据
     */
    schema.value = piniaPropsReactive;

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
      if (!schema.value) {
        return <div class="loading">Application is not initialized</div>;
      }
      return (
        <App //
          baseUrl="/renderer/vue/simulator.html"
          routeName={routeName.value}
          schema={schema.value}
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
