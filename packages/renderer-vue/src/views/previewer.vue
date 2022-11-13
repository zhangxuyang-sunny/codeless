<script lang="tsx">
import { defineComponent, ref, shallowRef, watch } from "vue";
import { ApplicationData } from "@codeless/types";
import { loadRemotePackages } from "../utils/common";
import { ApplicationRuntime } from "../core/runtime-schema";
import { defineApplication } from "../core/defineApplication";
import { ApplicationTransformer } from "../core/transformer";

// 预览器数据自行获取，通过 url 传递 id
export default defineComponent({
  name: "Previewer",
  setup() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<ApplicationData>();
    const application = shallowRef<ApplicationRuntime>();

    window.fetch(`http://localhost:3333/api/v1/project?id=${id}`).then(async response => {
      const data: { data: ApplicationData } = await response.json();
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

    const App = defineApplication();
    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!application.value) {
        return <div class="loading">Application is not initialized</div>;
      }
      return (
        <App //
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
