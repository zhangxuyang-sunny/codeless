<script lang="tsx">
import { defineComponent, h, onMounted, provide, ref, watchEffect } from "vue";
import { RouterView, useRouter } from "vue-router";
import { NodeTypes, PageSchema, ProjectSchema } from "packages/x-nodes/index";

export default defineComponent({
  name: "RendererVue",
  setup() {
    const router = useRouter();
    // 注册 onMounted 回调函数
    const mountedDepSet = new Set<() => void>();
    const schemaRef = ref<PageSchema | ProjectSchema>();

    // 注册渲染器 api
    window.__X_RENDERER_API__ = {
      document,
      async updateSchema(schema) {
        schemaRef.value = schema;
      },
      onMounted: (fn: () => void) => {
        mountedDepSet.add(fn);
      }
    };

    onMounted(() => {
      mountedDepSet.forEach(fn => fn());
    });

    // provide 下去
    provide("schemaRef", schemaRef);

    watchEffect(() => {
      switch (schemaRef.value?.type) {
        case NodeTypes.Project: {
          router.replace("/project");
          break;
        }
        case NodeTypes.Page: {
          router.replace("/page");
          break;
        }
        default: {
          router.replace("/empty");
        }
      }
    });

    return () => h(RouterView);
  }
});
</script>
