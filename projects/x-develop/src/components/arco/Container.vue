<script lang="tsx">
import { defineComponent, ref } from "vue";


export default defineComponent({
  setup(props, { slots }) {
    return () => <div class="container-widget" {...props} >
      { slots.default?.() }
    </div>
  },
});
</script>




<style lang="less">
.test-container {
  width: 100%;
  height: 100%;
  background-color: aqua;
  header {
    height: 45px;
    background-color: pink;
  }
  .main {
    height: 700px;
    width: 100%;
    background-color: palegoldenrod;
  }
}
</style>
