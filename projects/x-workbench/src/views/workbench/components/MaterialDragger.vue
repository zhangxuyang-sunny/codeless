<script lang="tsx">
/* eslint-disable vue/one-component-per-file */
import { defineComponent, ref } from "vue";
import Draggable from "@/components/Common/Draggable.vue";
import type { SortableEvent } from "sortablejs";

const WidgetContainer = defineComponent({
  setup() {
    const list = ref([]);
    const onAdd = (customEvent: SortableEvent) => {
      // const { meta: props, data: propsDesc, slots } = customEvent.item._underlying_vm_;
      // list.value.push(new Widget(props, propsDesc, props.src, slots));
      // console.log(list.value);
    };
    return () => (
      <Draggable
        list={list.value}
        class="drag-main"
        options={{
          group: "workbench",
          onAdd
        }}
        v-slots={{
          item: () => {
            return <div></div>;
          }
        }}
      />
    );
  }
});

export default defineComponent({
  setup() {
    return () => (
      <div class="workbench">
        <WidgetContainer />
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.workbench {
  width: 100%;
  height: 100%;
  .flip-list-move {
    transition: transform 0.5s;
  }
  .workbench-draggable {
    height: 100%;
  }
  .drag-main {
    background-color: red;
    width: 100px;
    height: 100px;
  }
}
</style>
