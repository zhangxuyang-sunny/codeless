<script lang="tsx">
import { defineComponent } from "vue";
import { Button, Dropdown, Doption } from "@arco-design/web-vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "未登录",
    },
  },
  setup(props) {
    return () => (
      <Dropdown
        trigger="hover"
        v-slots={{
          content: () => {
            return (
              <>
                <Doption>立即登录</Doption>
                <Doption>跳转内网版</Doption>
              </>
            );
          },
        }}
      >
        <Button>{props.name}</Button>
      </Dropdown>
    );
  },
});
</script>
