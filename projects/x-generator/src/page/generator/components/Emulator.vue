<!-- <script lang="tsx">
import { defineComponent, onMounted } from "vue";
import XDragger from "./XDragger";

export default defineComponent({
  setup() {
    onMounted(() => {
      const boxEl = document.getElementById("box");
      const el = Array.from(
        boxEl.querySelectorAll<HTMLElement>("[data-is-x-component]").entries()
      ).map(([, element]) => element);
      console.log(el);
      const xDragger = new XDragger(el);
    });
    return () => (
      <div id="box" class="box">
        <span data-is-x-component>a</span>
        <span data-is-x-component>b</span>
        <span data-is-x-component>c</span>
        <span data-is-x-component>d</span>
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.box {
  display: flex;
  span {
    width: 100px;
    height: 100px;
    background-color: pink;
    border: 1px solid gray;
  }
}
</style> -->
