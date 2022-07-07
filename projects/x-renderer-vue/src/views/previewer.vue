<script lang="tsx">
import type { IProjectSchema, IApplication } from "packages/x-core/src/types/project";
import type { IViewSchema } from "packages/x-core/src/types/view";
import { MaterialTransformer } from "packages/x-core/src/transformer/MaterialTransformer";
import { computed, defineAsyncComponent, defineComponent, ref, shallowRef } from "vue";
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
    const views = shallowRef<IViewSchema[]>([]);
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));

    const viewConsumers = computed(() =>
      views.value.map(view => ({
        ...view,
        schema: new MaterialTransformer(view.schema).getConsumer()
      }))
    );

    // TODO 接口还没写
    window.fetch(`http://localhost:3333/api/v1/project?id=${id}`).then(async response => {
      const data: { data: IApplication } = await response.json();
      project.value = data.data.project;
      views.value = data.data.views;
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
        <Renderer
          baseUrl="/renderer/vue"
          routeName={routeName.value}
          project={project.value}
          views={viewConsumers.value}
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
