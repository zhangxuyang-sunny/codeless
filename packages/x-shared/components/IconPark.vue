<script lang="tsx">
import { defineComponent } from "vue";
import { IconPark, IconType, IIconAllProps } from "@icon-park/vue-next/es/all";

type TypeDefaultProps = {
  theme: IIconAllProps["theme"];
  size: IIconAllProps["size"];
};

export default defineComponent<IIconAllProps & { type: IconType }>({
  setup(props) {
    return () => (
      <IconPark
        {...Object.assign<TypeDefaultProps, IIconAllProps>({ theme:"filled", size: 16 }, props)}
      />
    );
  }
});
</script>

<style lang="less" scoped>
.i-icon {
  color: var(--color-text-1);
  line-height: 0;
}
</style>
