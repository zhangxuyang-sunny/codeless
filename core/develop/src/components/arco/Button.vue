<script lang="tsx">
import { defineComponent } from "vue";
import { Button } from "@arco-design/web-vue";
import "@arco-design/web-vue/lib/button/style/index"

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "按钮",
    },
  },
  setup(props) {
    return () => <Button>{props.name}</Button>;
  },
});
</script>
