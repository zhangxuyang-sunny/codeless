<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogicText",
  props: {
    content: String
  },
  setup(props) {
    return () => <span>{props.content}</span>;
  }
});
</script>
