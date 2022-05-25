<script lang="tsx">
import type { TypeMaterialListenerSchema } from "packages/x-types/material";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    listenerList: {
      type: Array as PropType<TypeMaterialListenerSchema[]>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div>
        {props.listenerList.map(item => (
          <div>
            {item.title} {item.description}
          </div>
        ))}
      </div>
    );
  }
});
</script>
