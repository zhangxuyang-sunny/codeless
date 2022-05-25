<script lang="tsx">
import type { PropType } from "vue";
import type { TypeMaterialMeta } from "packages/x-types/material";
import type { TypeMaterialPropOptions, TypePropString } from "packages/x-types/setters";
import { defineComponent } from "vue";
import { Tooltip } from "@arco-design/web-vue";
import { IconRelation } from "@arco-design/web-vue/es/icon";
import { getRandomStr } from "packages/x-shared/utils/randomString";
import Collapse from "@/components/Common/Collapse.vue";
import Prop from "./Prop.vue";

// 组件属性面板
export default defineComponent({
  props: {
    meta: {
      type: Object as PropType<TypeMaterialMeta>,
      required: true
    },
    propList: {
      type: Array as PropType<TypeMaterialPropOptions[]>,
      required: true
    }
  },
  setup(props) {
    const idProp: TypePropString = {
      type: "string",
      use: "input",
      prop: "cid",
      disabled: true,
      title: "唯一标识",
      description: "组件唯一标识",
      default: `${props.meta.name}_${getRandomStr(6)}`
    };
    return () => (
      <Collapse
        class="collapse"
        bordered={false}
        expandIconPosition="right"
        defaultActiveKey={["0", "1", "2"]}
      >
        <Collapse.Item key="0" header="组件属性">
          {[idProp, ...props.propList].map(prop => {
            return (
              <div class="prop-item">
                <div class="prop-header">
                  <Tooltip content={prop.prop}>
                    <span class="title">{prop.title}</span>
                  </Tooltip>
                  <span class="handler">
                    <Tooltip content="绑定响应式变量">
                      <span class="btn-item">
                        <IconRelation class="icon" />
                        <span class="name">绑定</span>
                      </span>
                    </Tooltip>
                  </span>
                </div>
                <span class="content">
                  <Prop propOption={prop} />
                </span>
              </div>
            );
          })}
        </Collapse.Item>
        <Collapse.Item key="1" header="通用属性">
          <div class="prop-item">
            <div class="prop-header">
              <span class="title">渲染条件</span>
              <span class="handler">
                <Tooltip content="绑定响应式变量">
                  <span class="btn-item">
                    <IconRelation class="icon" />
                    <span class="name">绑定</span>
                  </span>
                </Tooltip>
              </span>
            </div>
          </div>
          <div class="prop-item">
            <div class="prop-header">
              <span class="title">循环渲染</span>
              <span class="handler">
                <Tooltip content="绑定响应式变量">
                  <span class="btn-item">
                    <IconRelation class="icon" />
                    <span class="name">绑定</span>
                  </span>
                </Tooltip>
              </span>
            </div>
          </div>
        </Collapse.Item>
      </Collapse>
    );
  }
});
</script>

<style lang="less" scoped>
.collapse {
  :deep(.arco-collapse-item-content) {
    padding: 0 13px;
    background: transparent;
  }
  .prop-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    border-bottom: 1px dashed var(--color-border-1);
    .prop-header {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      // border-bottom: 1px dashed var(--color-border-1);
      .title {
        color: var(--color-text-1);
      }
      .handler {
        display: flex;
        align-items: center;
        color: var(--color-text-1);
        .btn-item {
          display: flex;
          align-items: center;
          padding: 0 4px 0 0;
          cursor: pointer;
          border-radius: 2px;
          &:hover {
            background-color: var(--color-border-1);
          }
        }
        .icon {
          font-size: 16px;
          margin: 0 2px;
          color: var(--color-text-1);
        }
        .name {
          font-size: 12px;
        }
      }
    }
    .content {
      margin-bottom: 10px;
    }
  }
}
</style>
