<script lang="tsx">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Workbench from "./components/Workbench.vue";
import Toolbar from "@/components/Toolbar.vue";

export default defineComponent({
  setup() {
    // 设置为暗黑主题
    document.body.setAttribute("arco-theme", "");
    return () => (
      <main class="main">
        <Header
          class="header"
          v-slots={{
            right: () => <Toolbar />
          }}
        />
        <Workbench class="workbench" />
      </main>
    );
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
}
</style>
