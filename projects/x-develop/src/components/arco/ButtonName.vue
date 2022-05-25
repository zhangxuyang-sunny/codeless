<script lang="tsx">
import { defineComponent } from "vue";
import { Button, Message } from "@arco-design/web-vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "按钮",
    },
  },
  setup(props, ctx) {
    return () => <Button type="primary">{ctx.slots.default?.()}</Button>;
  },
});
</script>
