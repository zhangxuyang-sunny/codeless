<script lang="tsx">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import Sortable from "sortablejs";

const { h } = await System.import<typeof import("vue")>("vue");

export { Sortable };

// 简单包装一下 Sortable
// options 通过组件传入
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true
    },
    // http://www.sortablejs.com/options.html
    options: {
      type: Object as PropType<Sortable.Options>,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    // const sortableRef = ref<HTMLElement | null>(null);

    // watchEffect(() => {
    //   if (!sortableRef.value) return;
    //   Sortable.create(sortableRef.value, props.options);
    // });
    console.log(props.list);
    return () => (
      <div
        ref={ref => {
          if (!ref) return;
          if (ref instanceof HTMLElement) {
            Sortable.create(ref, props.options);
          } else {
            console.warn("[draggable] ref is not HTMLElement", ref);
          }
        }}
      >
        {props.list.map((item, index) => ctx.slots.item?.(item, index))}
      </div>
    );
  }
});
</script>
