<script lang="tsx">
import { v4 as uuid } from "uuid";
import { defineComponent, ref } from "vue";
import { Spin } from "@arco-design/web-vue";
import { PageNode, PageSchema } from "packages/x-core";
import { usePageStore, useRouterConfig } from "./store";
import Sidebar from "./components/Sidebar/Index.vue";
import HeaderVue from "./components/Header/Index.vue";
import SettersVue from "./components/Setters/Index.vue";
import SimulatorIframe from "./components/SimulatorIframe/Index.vue";
import { testSchema1 } from "./mock/testSchema";

export default defineComponent({
  setup() {
    const pageStore = usePageStore();

    const loading = ref(true);

    const { initRouterConfig } = useRouterConfig();

    function getData(): Promise<PageSchema[]> {
      return new Promise(resolve => {
        setTimeout(() => {
          const pages = [
            new PageNode().setTitle("首页").setId(uuid().substring(0, 8)).getSchema(),
            new PageNode()
              .setTitle("详情页")
              .setId(uuid().substring(0, 8))
              .setSchema(testSchema1)
              .getSchema()
          ];
          resolve(pages);
        }, 1000);
      });
    }

    getData().then(res => {
      initRouterConfig(res);
      pageStore.init(res[1]);
      loading.value = false;
    });
    return () => (
      <Spin loading={loading.value} tip="数据加载中">
        <div class="generator-container">
          <HeaderVue />
          <div class="main">
            <div class="left">
              <Sidebar />
            </div>
            <div class="widget-edit-container">
              <SimulatorIframe />
            </div>
            <div class="right">
              <SettersVue />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
});
</script>
<style lang="less">
.i-icon {
  line-height: 0.5px;
}
</style>
<style lang="less" scoped>
.generator-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: var(--color-border-1);
  .main {
    flex: 1;
    padding: 6px;
    display: flex;
    .widget-edit-container {
      flex: 1;
      margin: 0 6px;
      border-radius: 4px;
      background-color: var(--color-bg-2);
    }
    .left,
    .right {
      display: flex;
      overflow: hidden;
      grid-column-gap: 6px;
    }
  }
}
</style>
