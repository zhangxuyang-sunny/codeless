<script lang="tsx">
import Widget from "@low/generator/src/classes/Widget";
/* eslint-disable vue/no-mutating-props */
import type { PropType } from "vue";

import * as Sortable from "sortablejs";
import type { SortableEvent } from "sortablejs";
import { onMounted, ref, defineComponent } from "vue";
// 临时使用
let tempDragData: unknown = "";
type TypeDragEvent = SortableEvent & { originalEvent: DragEvent };
export default defineComponent({
  name: "Draggable",
  props: {
    list: {
      type: Array as PropType<Widget[]>,
      default: () => [],
      require: true
    }
  },
  emits: ["start", "end"],
  setup(props, ctx) {
    const dragEl = ref();
    const removeNode = (node: Element): void => {
      if (node.parentElement !== null) {
        node.parentElement.removeChild(node);
      }
    };

    const init = () => {
      if (!dragEl.value) return;

      Sortable.create(dragEl.value, {
        group: {
          name: "widget"
        },
        onStart(evt) {
          tempDragData = JSON.parse(JSON.stringify(props.list[evt.oldDraggableIndex || 0]));
        },
        onAdd(evt) {
          const $evt = evt as TypeDragEvent;
          removeNode(evt.item);
          const element: { data: any; dataDescription: any; src: string } =
            evt.item._underlying_vm_;
          if ($evt.newDraggableIndex !== undefined) {
            props.list.splice(
              $evt.newDraggableIndex,
              0,
              new Widget(element.data, element.dataDescription, element.src)
            );
          }
        },
        onEnd(evt) {
          const $evt = evt as TypeDragEvent;

          const data = $evt.originalEvent.dataTransfer?.getData("item");
          ctx.emit("end", data);
        },
        onUpdate(evt: SortableEvent) {
          if (evt.newDraggableIndex !== undefined && evt.oldDraggableIndex !== undefined) {
            props.list.splice(
              evt.newDraggableIndex,
              0,
              props.list.splice(evt.oldDraggableIndex, 1)[0]
            );
          }
        }
      });
    };
    onMounted(init);
    return () => (
      <div id="draggableContainer" ref={dragEl}>
        {props.list.map((element: Widget, index: number) => ctx.slots.item?.({ element, index }))}
        {props.list.length ? null : <din class="drag-placeholder">拖入组件</din>}
      </div>
    );
  }
});
</script>

<style lang="less">
#draggableContainer {
  height: 100%;
  width: 100%;
  position: relative;
  .drag-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    border: 1px dashed #eee;
  }
}
</style>
