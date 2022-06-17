<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialSchema } from "packages/x-types/material";
import { defineComponent } from "vue";
import Draggable from "@/components/Common/Draggable.vue";
import RemoteComponent from "@/components/Common/RemoteComponent.vue";

// 物料布局器
export default defineComponent({
  name: "MaterialOverlayer",
  props: {
    list: {
      type: Array as PropType<Array<TypeMaterialSchema>>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="material-overlayer-container">
        <Draggable
          class="overlayer-draggable"
          list={props.list}
          options={{
            sort: true,
            ghostClass: "ghost-class",
            chosenClass: "ghost-class",
            animation: 100,
            group: {
              name: "workbench",
              pull: "clone"
              // put: ""
            }
          }}
          v-slots={{
            item: (descriptor: TypeMaterialSchema) => <RemoteComponent url={descriptor.url} />
          }}
        />
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.material-overlayer-container {
  width: 100%;
  height: 100%;
  .overlayer-draggable {
    width: 100%;
    height: 100%;
  }
}
</style>
