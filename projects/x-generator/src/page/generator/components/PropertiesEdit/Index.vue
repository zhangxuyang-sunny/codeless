<script lang="tsx">
import { defineComponent } from "vue";
import { TypePropsSetter } from "packages/x-types/setters";
import PropVue from "./Prop.vue";
export default defineComponent({
  setup() {
    const props: TypePropsSetter[] = [
      {
        propertyKey: "title",
        title: "text",
        use: {
          selector: "input",
          props: {}
        }
      }
    ];

    const Pros = (prop: TypePropsSetter, parentPropertyKey = ""): JSX.Element => {
      const path = parentPropertyKey.split(",");

      path.push(prop.propertyKey);

      if (prop.use === "object") {
        return (
          <div class="prop-object">{prop.properties.map(_p => Pros(_p, path.toString()))}</div>
        );
      } else {
        return <PropVue data={prop} propertyKey={path.join(".").replace(/^\./, "")} />;
      }
    };

    return () => <div className="setters-container">{props.map(prop => Pros(prop))}</div>;
  }
});
</script>

<style lang="less"></style>
