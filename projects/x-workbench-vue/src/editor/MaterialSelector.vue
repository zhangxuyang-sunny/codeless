<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialSchema } from "packages/x-types/material";
import { defineComponent } from "vue";
import Draggable from "@/components/Common/Draggable.vue";
import RemoteComponent from "@/components/Common/RemoteComponent.vue";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<Array<TypeMaterialSchema>>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <Draggable
        class="material-list"
        list={props.list}
        options={{
          sort: false,
          ghostClass: "ghost-class",
          chosenClass: "ghost-class",
          animation: 100,
          group: {
            name: "workbench",
            pull: "clone",
            put: false
          }
        }}
        v-slots={{
          item: (descriptor: TypeMaterialSchema) => {
            return (
              <div class="material-item">
                <RemoteComponent url={descriptor.url} />
                <div class="info">{descriptor.meta.title}</div>
              </div>
            );
          }
        }}
      />
    );
  }
});
</script>

<style lang="less" scoped>
.ghost-class {
  border: solid var(--color-primary-light-1) 1px;
}
.material-list {
  display: flex;
  flex-wrap: wrap;
  max-height: 100%;
  overflow: auto;
  .material-item {
    cursor: pointer;
    width: 45%;
    height: 200px;
    margin: 4px;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid var(--color-border-1);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .info {
      justify-self: flex-end;
    }
  }
}
</style>
