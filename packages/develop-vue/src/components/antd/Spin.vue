<script lang="tsx">
import { defineComponent, ref } from "vue";
import { Spin } from "ant-design-vue";
import { useEvents } from "../../core/hooks/useEvents";

export default defineComponent({
  setup() {
    const emitter = useEvents();
    const spinning = ref(false);
    emitter.on(`toggle`, () => {
      spinning.value = !spinning.value;
    });
    return () => <Spin spinning={spinning.value} />;
  }
});
</script>
