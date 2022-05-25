<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialPropOptions } from "packages/x-types/setters";
import { defineComponent, toRef } from "vue";
import { Input, InputNumber, Radio, Select, Switch } from "@arco-design/web-vue";

// 组件属性编辑器
// 根据 json 配置渲染对应编辑器
// use: input | inputNumber | radio | select | multi
// type: boolean | number | string | array | object
// number 和 string 可设定 radio | select 单项选择器
const ComponentProp = defineComponent({
  props: {
    propOption: {
      type: Object as PropType<TypeMaterialPropOptions>,
      required: true
    }
  },
  setup(props) {
    const propOption = toRef(props, "propOption");
    if (!propOption.value) return null;
    return () => {
      switch (propOption.value.type) {
        case "boolean": {
          return <Switch defaultChecked={propOption.value.default} />;
        }
        case "number":
        case "string": {
          switch (propOption.value.use) {
            case "input": {
              return (
                <Input
                  placeholder={propOption.value.description}
                  defaultValue={propOption.value.default}
                  disabled={propOption.value.disabled}
                  allowClear
                />
              );
            }
            case "inputNumber": {
              return (
                <InputNumber
                  placeholder={propOption.value.description}
                  defaultValue={propOption.value.default}
                  disabled={propOption.value.disabled}
                />
              );
            }
            case "radio": {
              return (
                <Radio.Group
                  defaultValue={propOption.value.default}
                  disabled={propOption.value.disabled}
                >
                  {propOption.value.enums.map(item => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              );
            }
            case "select": {
              return (
                <Select
                  placeholder={propOption.value.description}
                  defaultValue={propOption.value.default}
                  disabled={propOption.value.disabled}
                  options={propOption.value.enums}
                />
              );
            }
            default: {
              return null;
            }
          }
        }
        case "multi": {
          return propOption.value.oneOf.map(item => <ComponentProp propOption={item} />);
        }
      }
    };
  }
});
export default ComponentProp;
</script>
