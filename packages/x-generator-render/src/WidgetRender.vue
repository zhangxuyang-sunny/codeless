<script lang="tsx">
import type { PropType } from "vue";
import type Widget from "@low/generator/src/classes/Widget";
import { defineAsyncComponent, toRefs, defineComponent } from "vue";

export default defineComponent({
  props: {
    widget: {
      type: Object as PropType<Widget>,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const { src, data } = toRefs(props.widget);
    const Content = defineAsyncComponent(async () => await System.import(src.value));

    return () => <Content {...data.value} v-slots={ctx.slots} class="widget"></Content>;
  }
});
</script>
<style lang="less" scoped>
.widget {
  outline: 1px dashed red;
}
</style>
