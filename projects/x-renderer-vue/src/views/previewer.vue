<script lang="tsx">
import type { IProjectSchema } from "packages/x-core/dist/types/project";
import type { IViewSchema } from "packages/x-core/dist/types/view";
import { defineAsyncComponent, defineComponent, ref, shallowRef } from "vue";
import { loadRemotePackages } from "../utils/common";

// 要异步加载 remote vue
const Renderer = defineAsyncComponent(() => import("../components/Renderer.vue"));

// TODO
// 预览器数据自行获取，通过 url 传递 id
export default defineComponent({
  name: "Previewer",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const project = shallowRef<IProjectSchema>();
    const pages = shallowRef<IViewSchema[]>([]);
    const { projectId } = Object.fromEntries(new URLSearchParams(window.location.search));

    // TODO 接口还没写
    window.fetch("http://" + projectId).then(async response => {
      const data = await response.json();
      project.value = data.project;
      pages.value = data.pages;
    });

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
    });

    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!project.value) {
        return <div class="loading">No configuration.</div>;
      }
      return (
        <Renderer //
          baseUrl="/renderer/vue"
          routeName={routeName.value}
          project={project.value}
          views={pages.value}
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
