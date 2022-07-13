<script lang="tsx">
import { defineComponent, ref, shallowRef, watch } from "vue";
import { ApplicationSchema } from "packages/x-core/src/types/schemas/application";
import { loadRemotePackages } from "../utils/common";
import { ApplicationRuntime } from "../core/schema";
import { defineApplication } from "../core/defineApplication";
import { ApplicationTransformer } from "@/core/Transformer";

const Application = defineApplication({
  vue: await System.import("vue"),
  vueRouter: await System.import("vue-router"),
  pinia: await System.import("pinia")
});

// 预览器数据自行获取，通过 url 传递 id
export default defineComponent({
  name: "Previewer",
  setup() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<ApplicationSchema>();
    const application = shallowRef<ApplicationRuntime>();

    window.fetch(`http://localhost:3333/api/v1/project?id=${id}`).then(async response => {
      const data: { data: ApplicationSchema } = await response.json();
      schema.value = data.data;
    });

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
      console.log(123);
    });

    watch([initialized, schema], () => {
      if (initialized.value && schema.value) {
        application.value = new ApplicationTransformer(schema.value).runtime();
      }
    });

    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!application.value) {
        return <div class="loading">Application is not initialized</div>;
      }
      return (
        <Application //
          baseUrl="/renderer/vue"
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
