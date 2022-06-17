<script lang="tsx">
import { defineComponent } from "vue";
import { useEditorStore } from "@/stores/modules/workbench/index";
import Draggable from "@/components/Common/Draggable.vue";

import type { PropType } from "vue";
import type { TypeMaterialSchema } from "packages/x-types/material";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "未分类"
    },
    materials: {
      type: Array as PropType<TypeMaterialSchema[]>,
      default: () => []
    }
  },
  setup(props) {
    const editorStore = useEditorStore();
    if (!editorStore.materialSelect) {
      editorStore.setMaterialSelect(props.materials[0]);
    }

    return () => (
      <div class="materials-category">
        <h4 class="title">{props.title}</h4>
        <Draggable
          list={props.materials}
          class="materials"
          options={{
            sort: false,
            ghostClass: "ghost-class",
            chosenClass: "ghost-class",
            group: {
              name: "workbench",
              pull: "clone",
              put: false
            }
          }}
          v-slots={{
            item: (material: TypeMaterialSchema, index: number) => {
              if (material.meta) {
                return (
                  <div
                    class="material-item"
                    key={index}
                    onClick={() => {
                      editorStore.setMaterialSelect(material);
                    }}
                    ref={el => {
                      if (el) {
                        // el._underlying_vm_ = material;
                      }
                    }}
                  >
                    <div class="name">{material.meta.title}</div>
                  </div>
                );
              }
            }
          }}
        />
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.materials-category {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed var(--color-border-1);
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  .title {
    display: inline-block;
    margin: 0 0 10px 0;
    color: var(--color-text-1);
  }
  .materials {
    display: grid;
    grid-template-columns: repeat(2, 120px);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    justify-content: center;
    // display: flex;
    // flex-wrap: wrap;
    .ghost-class {
      border: 2px dashed rgb(var(--primary-6));
    }
    .material-item {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      color: var(--color-text-2);
      background-color: var(--color-border-1);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        border: 2px solid rgb(var(--primary-6));
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
      .name {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>
