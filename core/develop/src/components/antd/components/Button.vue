<script lang="tsx">
import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
// import "ant-design-vue/es/button/style/css";

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
