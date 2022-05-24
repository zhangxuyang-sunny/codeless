<script lang="tsx">
import { defineComponent } from "vue";
import useCreateRenderApp from "@/hooks/useCreateRenderApp";
import project from "./draft/schema";

const RENDERER_ID = "__renderer__";
export default defineComponent({
  name: "Renderer",
  setup() {
    const { createProjectApp } = useCreateRenderApp();
    return () => (
      <div
        id={RENDERER_ID}
        ref={async el => {
          if (!el) return;
          const renderApp = await createProjectApp(project);
          if (el instanceof Element) {
            renderApp.mount(el);
          } else {
            renderApp.mount(`#${RENDERER_ID}`);
          }
        }}
      />
    );
  }
});
</script>
