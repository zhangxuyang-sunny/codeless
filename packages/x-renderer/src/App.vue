<script lang="tsx">
import { defineComponent, h } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "Renderer",
  render() {
    return h(RouterView);
  }
});
</script>
