<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "按钮",
    },
  },
  setup(props) {
    return () => <div>{props.name}</div>;
  },
});
</script>
