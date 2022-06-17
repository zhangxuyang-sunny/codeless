<script lang="tsx">
import { computed, defineComponent, reactive, watchEffect } from "vue";
import { Empty, Select } from "@arco-design/web-vue";

import useMaterialUIList from "../hooks/useMaterialUIList";
import useMaterialList from "../hooks/useMaterialList";
import MaterialDisplay from "./MaterialDisplay.vue";

import type { TypeMaterialSchema } from "packages/x-types/material";
import type { TypeMaterialUICategory } from "@/api";

export default defineComponent({
  setup() {
    const uiSelect = reactive<{
      index: number;
      data: TypeMaterialUICategory | null;
    }>({
      index: 0,
      data: null
    });
    const {
      list: materialUIList // UI 列表
    } = useMaterialUIList({ immediate: true });
    const {
      list: materialList, // 组件列表
      doFetch: doFetchMaterialList
    } = useMaterialList();
    watchEffect(() => {
      uiSelect.data = materialUIList.value[uiSelect.index];
    });
    watchEffect(() => {
      if (!uiSelect.data) return;
      doFetchMaterialList(uiSelect.data.name, "latest");
    });
    const categoryList = computed(() => {
      const mapper = materialList.value.reduce<Record<string, TypeMaterialSchema[]>>(
        (prev, item) => {
          const category = item.meta?.category;
          if (category) {
            if (!(category in prev)) {
              prev[category] = [];
            }
            prev[category].push(item);
          }
          return prev;
        },
        {}
      );
      return Object.keys(mapper).map(title => ({
        title,
        list: mapper[title]
      }));
    });

    // const panelMapper = [
    //   {
    //     title: '基础组件',
    //     Content: () => <Props meta={meta} propList={data.props || []} />
    //   },
    //   {
    //     title: '组件中心',
    //     Content: () => <Style />
    //   }
    // ];
    console.log({ categoryList });
    return () => {
      if (materialUIList.value.length <= 0) {
        return <Empty class="empty-status" description="无组件" />;
      }
      return (
        <div class="material-selector">
          <div class="ui-selector">
            <span class="title">组件库</span>
            {materialUIList.value.length && (
              <Select defaultValue={uiSelect.index} v-model={[uiSelect.index, "modelValue"]}>
                {materialUIList.value.map((item, index) => (
                  <Select.Option value={index} label={item.title} />
                ))}
              </Select>
            )}
          </div>
          <div class="materials">
            {categoryList.value.length ? (
              categoryList.value.map(category => (
                <MaterialDisplay title={category.title} materials={category.list} />
              ))
            ) : (
              <Empty class="empty-status" description="无组件" />
            )}
          </div>
        </div>
      );
    };
  }
});
</script>

<style lang="less" scoped>
.empty-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.material-selector {
  height: 100%;
  .ui-selector {
    .title {
      flex-shrink: 0;
      margin-right: 10px;
      color: var(--color-text-1);
    }
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border-1);
  }
  .materials {
    margin: 20px 0;
  }
}
</style>
