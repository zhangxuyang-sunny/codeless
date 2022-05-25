<script lang="tsx">
import { defineComponent } from "vue";
import Generator from "@low/generator/src/Index.vue";
export default defineComponent({
  setup() {
    // 设置为暗黑主题
    document.body.setAttribute("arco-theme", "");
    return () => <Generator />;
  }
});
</script>

<style>
body {
  margin: 0;
  background-color: var(--color-border-1);
}
</style>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  .header {
    flex-shrink: 0;
    border-bottom: 1px solid var(--color-border-2);
  }

  .workbench {
    flex-grow: 1;
    overflow: auto;
  }

  .generate-app {
    flex: 1;
  }
}
</style>
