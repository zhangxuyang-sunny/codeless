<script lang="tsx">
import { MaterialTransformer } from "packages/x-core/src/transformer/MaterialTransformer";
import { IProjectSchema } from "packages/x-core/src/types/project";
import { IViewSchema } from "packages/x-core/src/types/view";
import { computed, defineAsyncComponent, defineComponent, ref, shallowRef } from "vue";
import { loadRemotePackages } from "../utils/common";

// 要异步加载 remote vue
const Renderer = defineAsyncComponent(() => import("../components/Renderer.vue"));

export default defineComponent({
  name: "Simulator",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const project = shallowRef<IProjectSchema>();
    const views = shallowRef<IViewSchema[]>([]);
    const viewConsumers = computed(() =>
      views.value.map(view => ({
        ...view,
        schema: new MaterialTransformer(view.schema).getConsumer()
      }))
    );

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
    });

    // 注册渲染器 api
    window.__X_RENDERER_API__.updateCurrentRoute = name => {
      routeName.value = name;
    };
    window.__X_RENDERER_API__.updateProject = schema => {
      project.value = schema;
      console.log("project", schema);
    };
    window.__X_RENDERER_API__.updateViews = data => {
      views.value = data;
      console.log("views", data);
    };

    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!project.value) {
        return <div class="loading">No configuration.</div>;
      }
      return (
        <Renderer //
          baseUrl="/renderer/vue/simulator.html"
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
