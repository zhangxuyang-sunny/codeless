<script lang="tsx">
import { defineAsyncComponent, defineComponent, ref, shallowRef } from "vue";
import { PageNode, PageValue, ProjectNode, ProjectValue } from "packages/x-nodes/dist";
import { loadRemotePackages } from "./utils/common";
import { page1 } from "./draft/page1";
import { page2 } from "./draft/page2";
import { project1 } from "./draft/project";

// 要异步加载 remote vue
const ProjectRender = defineAsyncComponent(() => import("./views/Project.vue"));

export default defineComponent({
  name: "RendererVue",
  setup() {
    const initialized = ref(false);
    const routeName = ref("");
    const project = shallowRef<ProjectValue>();
    const pages = shallowRef<PageValue[]>([]);

    loadRemotePackages().then(result => {
      window.vue = result.vue;
      window.vueRouter = result.vueRouter;
      window.pinia = result.pinia;
      initialized.value = true;
    });

    project.value = new ProjectNode().setSchema(project1).getValue();
    pages.value = [page1, page2].map(schema => new PageNode().setSchema(schema).getValue());

    // 注册渲染器 api
    window.__X_RENDERER_API__.updateCurrentRoute = name => {
      routeName.value = name;
    };
    window.__X_RENDERER_API__.updateProjectSchema = schema => {
      project.value = new ProjectNode().setSchema(schema).getValue();
    };
    window.__X_RENDERER_API__.updatePageSchemaList = schemas => {
      pages.value = schemas.map(schema => new PageNode().setSchema(schema).getValue());
    };

    return () => {
      if (!initialized.value || !project.value) {
        return <div class="loading">loading...</div>;
      }
      return (
        <ProjectRender //
          routeName={routeName.value}
          project={project.value}
          pages={pages.value}
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
