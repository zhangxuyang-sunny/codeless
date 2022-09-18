<script lang="tsx">
import { Button } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style";
import { defineComponent, ref, watchEffect } from "vue";
import { useEvents } from "../../core/hooks/useEvents";

export default defineComponent({
  props: {
    name: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, ctx) {
    const loading = ref(props.loading);
    watchEffect(() => {
      loading.value = props.loading;
    });

    const event = useEvents();
    event.onSelf("change_loading", (status) => {
      if (typeof status === "boolean") {
        loading.value = status;
      } else {
        console.warn("status should be a boolean");
      }
    });
    event.onSelf("open_loading", () => {
      loading.value = true;
    });
    event.onSelf("cancel_loading", () => {
      loading.value = false;
    });
    event.onSelf("toggle_loading", (...args) => {
      console.log(args);
      loading.value = !loading.value;
    });

    return () => (
      <Button
        loading={loading.value}
        onClick={(e) => {
          console.log(1, e);
          event.emitSelf("click", e, 2, 3);
          ctx.emit("click", e, 2, 3);
        }}>
        {props.name}
      </Button>
    );
  }
});
</script>
