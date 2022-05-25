<script lang="tsx">
import { defineComponent } from "vue";
import loadRemoteComponent from "packages/x-shared/utils/loadRemoteComponent";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const Remote = loadRemoteComponent(props.url);
    const Button = loadRemoteComponent<{ name: string }>("http://127.0.0.1:7890/ui/arco/Button.js");
    return () => <Remote v-slots={{ main: () => <Button name="按钮1"></Button> }}></Remote>;
  }
});
</script>
