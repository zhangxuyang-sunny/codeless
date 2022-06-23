<script lang="tsx">
import { defineComponent, ref } from "vue";


export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="container-widget" {...props} >
      { slots.default?.() }
    </div>
    )
  },
});
</script>




<style lang="less">
  .container-widget {
    height: 50px;
  }
</style>
