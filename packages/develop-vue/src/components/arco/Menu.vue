<script lang="tsx">
import { defineComponent, PropType } from "vue";
import { Menu } from "@arco-design/web-vue";
import { MenuProps } from "@arco-design/web-vue/es/menu/interface";

interface TypeConfig {
  title: string;
  key: string;
  children?: TypeConfig[];
}
export default defineComponent({
  props: {
    menuProps: {
      type: Object as PropType<MenuProps>,
      default: () => ({})
    },
    config: {
      type: Array as PropType<TypeConfig[]>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <Menu {...props.menuProps}>
        {props.config?.map((item) => {
          if (Array.isArray(item.children)) {
            return (
              <Menu.SubMenu key={item.key} title={item.title}>
                {item.children.map((subMenu) => {
                  return (
                    <Menu.Item key={subMenu.key}>{subMenu.title}</Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          }
          return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
        })}
      </Menu>
    );
  }
});
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
