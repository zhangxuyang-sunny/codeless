<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialListenerSchema } from "packages/x-types/material";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    emitList: {
      type: Array as PropType<TypeMaterialListenerSchema[]>,
      required: true
    }
  },
  setup() {
    return () => (
      <>
        <div>
          <span>点击</span>
        </div>
      </>
    );
  }
});
</script>
