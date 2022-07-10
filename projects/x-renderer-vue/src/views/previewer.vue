<script lang="tsx">
import type {
  IProjectWithResource,
  IProjectConsumer,
  IProjectSchema
} from "packages/x-core/src/types/project";
import type { IViewConsumer, IViewSchema } from "packages/x-core/src/types/view";
import { computed, defineComponent, ref, shallowRef } from "vue";
import { MaterialOptionTransformer } from "packages/x-core/src/transformer/MaterialOptionTransformer";
import { ProjectTransformer } from "packages/x-core/src/transformer/ProjectTransformer";
import { loadRemotePackages } from "../utils/common";
import Renderer from "../components/Renderer.vue";

// 预览器数据自行获取，通过 url 传递 id
export default defineComponent({
  name: "Previewer",
  setup() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    const initialized = ref(false);
    const routeName = ref("");
    const projectSchema = shallowRef<IProjectSchema>();
    const projectConsumer = computed<IProjectConsumer>(() =>
      new ProjectTransformer(projectSchema.value).getConsumer()
    );
    const viewsSchema = shallowRef<IViewSchema[]>([]);
    const viewConsumers = computed<IViewConsumer[]>(() =>
      viewsSchema.value.map<IViewConsumer>(view => ({
        ...view,
        material: new MaterialOptionTransformer(view.material).getConsumer()
      }))
    );

    window.fetch(`http://localhost:3333/api/v1/project?id=${id}`).then(async response => {
      const data: { data: IProjectWithResource } = await response.json();
      projectSchema.value = data.data.project;
      viewsSchema.value = data.data.views;
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
      if (!projectSchema.value) {
        return <div class="loading">No configuration.</div>;
      }
      return (
        <Renderer
          baseUrl="/renderer/vue"
          routeName={routeName.value}
          project={projectConsumer.value}
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
