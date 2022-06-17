<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialSlotSchema } from "packages/x-types/material";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    slotList: {
      type: Array as PropType<TypeMaterialSlotSchema[]>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="component-slots">
        {props.slotList.map(item => (
          <div class="slot-item">
            {item.title} ({item.name})
          </div>
        ))}
      </div>
    );
  }
});
</script>
<style lang="less" scoped>
.component-slots {
  .slot-item {
    cursor: pointer;
    padding: 15px 0;
    // padding-bottom: 5px;
    border-bottom: 1px dashed var(--color-border-1);
  }
}
</style>
