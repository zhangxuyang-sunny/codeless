<script lang="tsx">
import { defineComponent, PropType } from "vue";
import { Typography } from "@arco-design/web-vue";
export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>
    }
  },
  setup(props) {
    return () => <Typography {...props}>{props.content}</Typography>;
  }
});
</script>
