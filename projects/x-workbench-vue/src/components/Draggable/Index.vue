<script lang="tsx">
/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h, onMounted, ref } from "vue";
import type { PropType } from "vue";
import Sortable, { SortableEvent } from "sortablejs";
export default defineComponent({
  name: "Draggable",
  props: {
    list: {
      type: Array as PropType<any[]>,
      default: () => [],
      require: true
    },
    config: {
      type: Object as PropType<Sortable.Options>,
      default: () => ({})
    }
  },
  emits: ["start", "end"],
  setup(props, ctx) {
    const dragRef = ref<HTMLElement>();

    const init = () => {
      const sortable = new Sortable(dragRef.value as HTMLElement, {
        ...props.config
        // onStart(evt: SortableEvent & { originalEvent: DragEvent }) {
        //   evt.originalEvent.dataTransfer?.setData(
        //     'item',
        //     JSON.stringify(props.list[evt.oldDraggableIndex || 0])
        //   );
        // },
        // onEnd(evt: SortableEvent & { originalEvent: DragEvent }) {
        //   const data = evt.originalEvent.dataTransfer?.getData('item');
        //   ctx.emit('end', data);
        // },
        // onUpdate(evt: SortableEvent) {
        //   props.list.splice(
        //     evt.newDraggableIndex,
        //     0,
        //     props.list.splice(evt.oldDraggableIndex, 1)[0]
        //   );
        // }
      });
    };
    onMounted(() => {
      init();
    });
    return () => (
      <div ref={dragRef}>
        {props.list.map((element, index) => ctx.slots.item?.({ element, index }))}
      </div>
    );
  }
});
</script>
