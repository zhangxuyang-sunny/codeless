<script lang="tsx">
import DragWidgetVue from "./DragWidget.vue";
import WidgetRenderVue from "./WidgetRender.vue";
import { defineComponent, PropType, ref } from "vue";
import type Widget from "@low/generator/src/classes/Widget";
const ComponentRender = defineComponent({
  props: {
    widgets: {
      type: Array as PropType<Widget[]>,
      default: () => [],
      require: true
    }
  },
  setup() {
    const list = ref([]);
    return () => (
      <DragWidgetVue
        list={list.value}
        v-slots={{
          item: ({ element }: { element: Widget }) => (
            <WidgetRenderVue
              widget={element}
              key={element.id}
              v-slots={Object.entries(element.slots).reduce((slots, [slotName, widgets]) => {
                slots[slotName] = <ComponentRender widgets={widgets} />;
                return slots;
              }, {})}
            ></WidgetRenderVue>
          )
        }}
      ></DragWidgetVue>
    );
  }
});

export default ComponentRender;
</script>
