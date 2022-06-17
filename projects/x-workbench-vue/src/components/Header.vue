<script lang="tsx">
import { defineComponent } from "vue";
import { Button, Divider, Space } from "@arco-design/web-vue";
import { Left } from "@icon-park/vue-next";

import UserVue from "./Common/User.vue";
import PageSelector from "../views/workbench/components/PageSelector.vue";
import RouterSetterButton from "../views/workbench/components/RouterSetterButton.vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <header class="header">
          <Space class="left">
            <Button shape="circle" type="text">
              <Left theme="outline" size="18" fill="#333" />
            </Button>
            <Divider direction="vertical" />
            <div class="page-selector">
              <PageSelector />
              <RouterSetterButton />
            </div>
          </Space>
          <Space class="right">
            {slots.right?.()}
            <UserVue />
          </Space>
        </header>
      );
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  padding: 0 10px;
  overflow: hidden;
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: center;
    .page-selector {
      display: flex;
      align-items: center;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
