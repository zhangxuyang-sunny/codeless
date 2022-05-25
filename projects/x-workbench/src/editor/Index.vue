<script lang="tsx">
import type { TypeMaterialSchema } from "packages/x-types/material";
import { defineComponent } from "vue";
import MaterialSelector from "./MaterialSelector.vue";
import MaterialOverlayer from "./MaterialOverlayer.vue";

const list: TypeMaterialSchema[] = [
  {
    type: 1,
    collection: false,
    url: "http://127.0.0.1:7890/dist/ui/arco/Button.js",
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "按钮",
      description: "按钮描述",
      name: "Button",
      image: "",
      category: "基础组件"
    }
  },
  {
    type: 1,
    collection: false,
    url: "http://127.0.0.1:7890/dist/ui/arco/DatePicker.js",
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "日期选择",
      description: "按钮描述",
      name: "Carousel",
      image: "",
      category: "基础组件"
    }
  },
  {
    type: 1,
    collection: false,
    url: "http://127.0.0.1:7890/dist/ui/arco/Table.js",
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "表格",
      description: "按钮描述",
      name: "表格",
      image: "",
      category: "基础组件"
    }
  },
  {
    type: 1,
    collection: false,
    url: "http://127.0.0.1:7890/dist/ui/arco/Input.js",
    options: {
      props: [],
      slots: [],
      emits: [],
      listeners: []
    },
    meta: {
      title: "输入框",
      description: "按钮描述",
      name: "表格",
      image: "",
      category: "基础组件"
    }
  }
];
export default defineComponent({
  name: "PageEditorApp",
  setup() {
    return () => (
      <main class="editor-container">
        <section class="selector">
          <MaterialSelector list={list} />
        </section>
        <section class="overlayer">
          <MaterialOverlayer list={[]} />
        </section>
      </main>
    );
  }
});
</script>

<style lang="less" scoped>
.editor-container {
  display: flex;
  height: 100%;
  overflow: hidden;
  .selector {
    flex-shrink: 0;
    width: 316px;
    height: 100%;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    border-right: 1px solid var(--color-border-1);
  }
  .overlayer {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
