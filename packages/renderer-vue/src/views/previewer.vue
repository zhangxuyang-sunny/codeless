<script lang="tsx">
import { defineComponent, ref, shallowRef } from "vue";
import { ApplicationData } from "@codeless/types";
import { loadRemotePackages } from "../utils/common";
import { defineApplication } from "../core/defineApplication";

// 预览器数据自行获取，通过 url 传递 id
export default defineComponent({
  name: "Previewer",
  setup() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    const initialized = ref(false);
    const routeName = ref("");
    const schema = shallowRef<ApplicationData>();

    window.fetch(`http://localhost:3333/api/v1/project?id=${id}`).then(async response => {
      const data: { data: ApplicationData } = await response.json();
      schema.value = data.data;
    });

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
    });

    const App = defineApplication();
    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!schema.value) {
        return <div class="loading">Application is not initialized</div>;
      }
      return (
        <App //
          baseUrl="/renderer/vue"
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
