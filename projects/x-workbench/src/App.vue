<script lang="tsx">
import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "RootApp",
  render() {
    return h(RouterView);
  }
});
</script>
