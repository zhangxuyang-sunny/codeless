<script lang="tsx">
import { defineComponent } from "vue";
import IframeTools from "../../../../classes/IframeTools";
import { usePageStore } from "../../store";
export default defineComponent({
  name: "SimulatorIframe",
  setup() {
    const pageStore = usePageStore();

    // iframe的工具挂载
    IframeTools.mount(pageStore);

    const iframeLoad = async (el: HTMLIFrameElement) => {
      if (el.contentDocument) {
        console.log("iframe加载完毕");
      }
    };

    return () => (
      <iframe
        class="simulator-iframe"
        frameborder="0"
        src="/simulator"
        ref={el => {
          if (el && el instanceof HTMLIFrameElement) {
            el.onload = () => iframeLoad(el);
          }
        }}
      ></iframe>
    );
  }
});
</script>
<style lang="less">
.simulator-iframe {
  height: 100%;
  width: 100%;
}
</style>
