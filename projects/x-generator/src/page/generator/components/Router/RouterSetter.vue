<script lang="tsx">
import { defineComponent, nextTick, PropType, reactive, ref, watch, watchEffect } from "vue";
import { Radio, Form, Input, Button, Divider } from "@arco-design/web-vue";
import type { PageSchema, RouterSchema } from "packages/x-nodes/index";
import HelpIconTooltip from "packages/x-shared/components/HelpIconTooltip.vue";

const urls = {
  "hash": "https://router.vuejs.org/zh/api/#createwebhashhistory",
  "history": "https://router.vuejs.org/zh/api/#createwebhistory",
  "memory": "https://router.vuejs.org/zh/api/#creatememoryhistory",
  "vue-router": "https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html"
};
const openUrl = (type: keyof typeof urls) => {
  window.open(urls[type], "_blank");
};
// 路由配置器
export default defineComponent({
  props: {
    routerMode: {
      type: String as PropType<RouterSchema["mode"]>,
      default: "hash"
    },
    pageList: {
      type: Array as PropType<PageSchema[]>,
      required: true
    }
  },
  emits: ["update:pageList", "update:routerMode", "add", "delete"],
  setup(props, ctx) {
    const currentRef = ref<HTMLDivElement>();

    // 配置表单数据
    const formModel = reactive({
      pageList: props.pageList,
      routerMode: props.routerMode
    });
    // 监听表单数据，发射 v-model 更新事件
    watch(
      () => formModel.pageList,
      () => ctx.emit("update:pageList", formModel.pageList),
      { deep: true }
    );

    // 删除二次确认标识
    const confirmFlags = ref<boolean[]>([]);
    // routes 改变，二次确认标识重置
    watchEffect(() => {
      confirmFlags.value = new Array(formModel.pageList.length).fill(false);
    });

    // 添加路由事件，并滚动到最后一个
    const addRoute = () => {
      ctx.emit("add");
      nextTick(() => {
        Array.from(currentRef?.value?.getElementsByClassName("page-item") || [])
          .at(-1)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    };
    // 删除一条路由配置
    const delRoute = (id: string, index: number) => {
      if (confirmFlags.value[index]) {
        ctx.emit("delete", id, index);
        confirmFlags.value.splice(index, 1);
      } else {
        // 二次确认，并将其他二次确认状态重置
        confirmFlags.value = confirmFlags.value.map((_, i) => i === index);
      }
    };
    return () => (
      <div ref={currentRef} class="router-setter-container">
        <Form model={formModel} layout="vertical">
          <Form.Item
            field="mode"
            v-slots={{
              label: () => (
                <div class="title-width-help">
                  <h3>路由模式</h3>
                  <HelpIconTooltip
                    tooltipProps={{
                      position: "right"
                    }}
                    iconProps={{
                      size: "15px"
                    }}
                    iconStyle={{
                      marginLeft: "4px"
                    }}
                    v-slots={{
                      content: () => (
                        <>
                          <span class="p-link" onClick={() => openUrl("hash")}>
                            hash 模式
                          </span>
                          <Divider direction="vertical" />
                          <span class="p-link" onClick={() => openUrl("history")}>
                            history 模式
                          </span>
                          <Divider direction="vertical" />
                          <span class="p-link" onClick={() => openUrl("memory")}>
                            memory 模式
                          </span>
                        </>
                      )
                    }}
                  />
                </div>
              )
            }}
          >
            <Radio.Group
              type="button"
              size="large"
              defaultValue={formModel.routerMode}
              onUpdate:modelValue={mode => {
                ctx.emit("update:routerMode", mode);
              }}
            >
              <Radio value="hash">hash</Radio>
              <Radio value="history">history</Radio>
              <Radio value="memory">memory</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            v-slots={{
              label: () => (
                <div class="title-width-help">
                  <h3>页面列表</h3>
                  <HelpIconTooltip
                    tooltipProps={{
                      position: "right"
                    }}
                    iconProps={{
                      size: "15px"
                    }}
                    iconStyle={{
                      marginLeft: "4px"
                    }}
                    v-slots={{
                      content: () => {
                        return (
                          <>
                            一个页面对应一个路由；一个页面也可对应多个路由，使用相同的页面 ID 即可。
                            <br />
                            <span class="p-link" onClick={() => openUrl("vue-router")}>
                              页面路径参考 vue-router（点击查看）
                            </span>
                          </>
                        );
                      }
                    }}
                  />
                </div>
              )
            }}
          >
            <div class="page-list">
              {formModel.pageList.map((page, index) => (
                <div class="page-item">
                  <Form.Item field={`pageList.${index}.id`} labelColStyle={{ display: "none" }}>
                    <div class="form-item">
                      <p class="title">页面ID</p>
                      <Input v-model:modelValue={page.id.value} placeholder="未填写页面ID" />
                    </div>
                  </Form.Item>
                  <span class="label"></span>
                  <Form.Item field={`pageList.${index}.title`} labelColStyle={{ display: "none" }}>
                    <div class="form-item">
                      <p class="title">页面名称</p>
                      <Input v-model:modelValue={page.title.value} placeholder="未填写页面名称" />
                    </div>
                  </Form.Item>
                  <span class="label"></span>
                  <Form.Item field={`pageList.${index}.path`} labelColStyle={{ display: "none" }}>
                    <div class="form-item">
                      <p class="title">页面路径</p>
                      <Input v-model:modelValue={page.urlPath.value} placeholder="未填写页面路径" />
                    </div>
                  </Form.Item>
                  <span class="label"></span>
                  {/**
                  <Form.Item field={`routes.${index}.page`}>
                    <div class="form-item">
                      <p class="title">页面</p>
                      <Select v-model:modelValue={route.page.key} placeholder="未选择页面">
                        {props.pages.map(page => (
                          <Select.Option>{page}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  </Form.Item>
                  <span class="label"></span>
                  */}
                  <Button
                    size="mini"
                    type="text"
                    status="danger"
                    disabled={formModel.pageList.length <= 1}
                    onClick={() => delRoute(page.id.value, index)}
                  >
                    {confirmFlags.value[index] ? "确认" : "删除"}
                  </Button>
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
        <Button class="add-button" size="small" onClick={addRoute}>
          添加
        </Button>
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.router-setter-container {
  height: 100%;
  padding: 10px;
  background-color: var(--color-bg-2);
  box-sizing: border-box;
  position: relative;
  .add-button {
    position: sticky;
    left: 100%;
    bottom: 0;
  }
}
.title-width-help {
  display: flex;
  align-items: center;
}
.p-link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.page-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  .page-item {
    display: flex;
    align-items: center;
    border-bottom: 1px dashed var(--color-border-1);
    margin-bottom: 10px;
    padding-bottom: 10px;
    .title {
      margin: 4px 0;
      color: var(--color-text-3);
      font-size: 12px;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .label {
      flex-shrink: 0;
      margin: 0 10px;
      width: 1px;
      height: 50px;
      background-color: var(--color-border-2);
    }
  }
}
</style>
