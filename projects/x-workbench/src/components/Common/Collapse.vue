<script lang="tsx">
import { defineComponent } from "vue";
import { Collapse as ACollapse } from "@arco-design/web-vue";

// 封装 Collapse 样式
const Collapse = defineComponent<InstanceType<typeof ACollapse>["$props"]>({
  inheritAttrs: false,
  setup(props, ctx) {
    return () => (
      <ACollapse {...ctx.attrs} class="collapse">
        {ctx.slots.default?.()}
      </ACollapse>
    );
  }
});

Collapse.Item = ACollapse.Item;
export const CollapseItem = ACollapse.Item;
export default Collapse;
</script>

<style lang="less" scoped>
.collapse {
  :deep(.arco-collapse-item-content) {
    padding: 0 13px;
    background: transparent;
  }
}
</style>
