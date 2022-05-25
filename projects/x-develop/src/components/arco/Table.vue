<script lang="tsx">
import { defineComponent } from "vue";
import { Table } from "@arco-design/web-vue";

export default defineComponent({
  name: "ArcoTable",
  setup() {
    return () => <Table />;
  },
});
</script>
<style scoped>
.switch {
  display: flex;
}
</style>
