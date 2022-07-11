<script lang="tsx">
import { computed, defineComponent, ref, shallowRef } from "vue";
import { IProjectConsumer, IProjectSchema } from "packages/x-core/src/types/project";
import { IViewConsumer, IViewSchema } from "packages/x-core/src/types/view";
import { MaterialOptionTransformer } from "packages/x-core/src/transformer/MaterialOptionTransformer";
import { ProjectTransformer } from "packages/x-core/src/transformer/ProjectTransformer";
import { loadRemotePackages } from "../utils/common";
import Renderer from "../components/Renderer.vue";

import { project } from "../draft/project";
import { view1 } from "../draft/view1";

export default defineComponent({
  name: "Simulator",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const projectSchema = shallowRef<IProjectSchema>();
    const projectConsumer = computed<IProjectConsumer>(() =>
      new ProjectTransformer(projectSchema.value).getConsumer()
    );
    const viewSchemas = shallowRef<IViewSchema[]>([]);
    const viewConsumers = computed<IViewConsumer[]>(() => {
      return viewSchemas.value.map<IViewConsumer>(view => ({
        ...view,
        material: new MaterialOptionTransformer(view.material).getConsumer()
      }));
    });

    /**
     * mock 数据
     */
    projectSchema.value = project;
    viewSchemas.value = [view1];

    console.log({
      projectSchema,
      projectConsumer,
      viewSchemas,
      viewConsumers
    });
    /** */

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
    window.__X_RENDERER_API__.updateProject = schema => {
      projectSchema.value = schema;
      console.log("update project:", schema);
    };
    window.__X_RENDERER_API__.updateViews = schemas => {
      viewSchemas.value = schemas;
      console.log("update views:", schemas);
    };

    return () => {
      if (!initialized.value) {
        return <div class="loading">loading...</div>;
      }
      if (!projectConsumer.value) {
        return <div class="loading">No configuration.</div>;
      }
      return (
        <Renderer //
          baseUrl="/renderer/vue/simulator.html"
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
