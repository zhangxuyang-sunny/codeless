<script lang="tsx">
import { TypePropsSetter } from "packages/x-types/setters";
import { defineComponent, PropType } from "vue";
import { Select } from "@arco-design/web-vue";
export default defineComponent({
  props: {
    data: {
      type: Object as PropType<TypePropsSetter>,
      required: true
    },
    propertyKey: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="prop-container">
        <span>{props.data.title}</span>
        <Select options={[{ value: "xxx" }]} />
      </div>
    );
  }
});
</script>

<style lang="less">
.prop-container {
  display: flex;
  grid-column-gap: 10px;
  align-items: center;
  padding: 10px;
}
</style>
