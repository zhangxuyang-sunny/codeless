<script lang="tsx">
/* eslint-disable vue/one-component-per-file */
import { defineComponent, onUnmounted } from "vue";

const { createApp } = await System.import<typeof import("vue")>("vue");
const EditorApp = await System.import("/x-generator-render/editArea.js");

const ID = "__page_editor__";

// 页面编辑器节点，包含物料选择器和画布设计器
// 使用远程 vue 创建 app，目的是为了配合渲染器可以自由指定 vue 版本
export default defineComponent({
  name: "PageEditor",
  setup() {
    console.log({ EditorApp });
    const app = createApp(EditorApp);
    onUnmounted(() => {
      app.unmount();
    });
    return () => (
      <div
        id={ID}
        ref={ref => {
          if (!ref) return;
          if (ref instanceof Element) {
            app.mount(ref);
          } else {
            app.mount(`#${ID}`);
          }
        }}
      />
    );
  }
});
</script>

<style lang="less" scoped>
#__page_editor__ {
  height: 100%;
  background-color: var(--color-bg-2);
}
</style>
