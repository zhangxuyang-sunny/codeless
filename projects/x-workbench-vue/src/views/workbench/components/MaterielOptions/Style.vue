<script lang="tsx">
import { defineComponent } from "vue";
import { Input, InputNumber, Radio, Select, Tooltip } from "@arco-design/web-vue";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconMenu
} from "@arco-design/web-vue/es/icon";
import { ColorPicker } from "vue3-colorpicker";
import Collapse, { CollapseItem } from "@/components/Common/Collapse.vue";
import IconFont from "@/components/Common/IconFont.vue";

export default defineComponent({
  setup() {
    return () => (
      <div class="component-style">
        <Collapse
          bordered={false}
          expandIconPosition="right"
          defaultActiveKey={["0", "1", "2", "3", "4", "5"]}
        >
          <CollapseItem key="0" header="布局">
            <div class="item-wrapper">
              <Tooltip content="display">
                <span class="title">布局方式</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="">
                <Radio value="">无</Radio>
                <Tooltip content="弹性布局(flex)">
                  <Radio value="flex">
                    <IconFont type="icon-layout-flex" />
                  </Radio>
                </Tooltip>
                <Tooltip content="块级布局(block)">
                  <Radio value="block">
                    <IconFont type="icon-layout-block" />
                  </Radio>
                </Tooltip>
                <Tooltip content="内联布局(inline)">
                  <Radio value="inline">
                    <IconFont type="icon-layout-inline" />
                  </Radio>
                </Tooltip>
                <Tooltip content="内联块级布局(inline-block)">
                  <Radio value="inlineBlock">
                    <IconFont type="icon-layout-inline-block" />
                  </Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <Tooltip content="display">
                <span class="title">换行</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="nowrap">
                <Tooltip content="默认不换行(nowrap)">
                  <Radio value="nowrap">不换行</Radio>
                </Tooltip>
                <Tooltip content="第一行在上方(wrap)">
                  <Radio value="wrap">正向换行</Radio>
                </Tooltip>
                <Tooltip content="第一行在下方(wrap-reverse)">
                  <Radio value="wrap-reverse">反向换行</Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <Tooltip content="flex-direction">
                <span class="title">主轴方向</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="row">
                <Tooltip content="主轴为水平方向，起点在左端(row)">
                  <Radio value="row">→</Radio>
                </Tooltip>
                <Tooltip content="主轴为水平方向，起点在右端(row-reverse)">
                  <Radio value="row-reverse">←</Radio>
                </Tooltip>
                <Tooltip content="主轴为垂直方向，起点在上沿(column)">
                  <Radio value="column">↓</Radio>
                </Tooltip>
                <Tooltip content="主轴为垂直方向，起点在下沿(column-reverse)">
                  <Radio value="column-reverse">↑</Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <Tooltip content="justify-content">
                <span class="title">主轴对齐</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="flex-start">
                <Tooltip content="左对齐(flex-start)">
                  <Radio value="flex-start">
                    <IconFont type="icon-flex-main-flex-start" />
                  </Radio>
                </Tooltip>
                <Tooltip content="居中对齐(center)">
                  <Radio value="center">
                    <IconFont type="icon-flex-main-center" />
                  </Radio>
                </Tooltip>
                <Tooltip content="右对齐(flex-end)">
                  <Radio value="flex-end">
                    <IconFont type="icon-flex-main-flex-end" />
                  </Radio>
                </Tooltip>
                <Tooltip content="两端对齐，项目之间的间隔都相等(space-between)">
                  <Radio value="space-between">
                    <IconFont type="icon-flex-main-space-between" />
                  </Radio>
                </Tooltip>
                <Tooltip content="每个项目两侧的间隔相等(space-around)">
                  <Radio value="space-around">
                    <IconFont type="icon-flex-main-space-around" />
                  </Radio>
                </Tooltip>
                <Tooltip content="(space-evenly)">
                  <Radio value="space-evenly">
                    <IconFont type="icon-flex-main-space-around" />
                  </Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <Tooltip content="align-items">
                <span class="title">交叉轴对齐</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="stretch">
                <Tooltip content="起点对齐(flex-start)">
                  <Radio value="flex-start">
                    <IconFont type="icon-flex-cross-flex-start" />
                  </Radio>
                </Tooltip>
                <Tooltip content="中点对齐(center)">
                  <Radio value="center">
                    <IconFont type="icon-flex-cross-center" />
                  </Radio>
                </Tooltip>
                <Tooltip content="终点对齐(flex-end)">
                  <Radio value="flex-end">
                    <IconFont type="icon-flex-cross-flex-end" />
                  </Radio>
                </Tooltip>
                <Tooltip content="如果未设置高度或设为auto，将占满整个容器的高度(stretch)">
                  <Radio value="stretch">
                    <IconFont type="icon-flex-align-items-flex-stretch" />
                  </Radio>
                </Tooltip>
                <Tooltip content="第一行文字基线对齐(baseline)">
                  <Radio value="space-around">
                    <IconFont type="icon-flex-align-items-baseline" />
                  </Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <Tooltip content="align-content">
                <span class="title">多根轴对齐</span>
              </Tooltip>
              <Radio.Group type="button" size="small" defaultValue="stretch">
                <Tooltip content="与交叉轴的起点对齐(flex-start)">
                  <Radio value="flex-start">
                    <IconFont style="transform:rotate(-90deg)" type="icon-flex-main-flex-start" />
                  </Radio>
                </Tooltip>
                <Tooltip content="与交叉轴的中点对齐(center)">
                  <Radio value="center">
                    <IconFont style="transform:rotate(-90deg)" type="icon-flex-main-center" />
                  </Radio>
                </Tooltip>
                <Tooltip content="与交叉轴的终点对齐(flex-end)">
                  <Radio value="flex-end">
                    <IconFont style="transform:rotate(-90deg)" type="icon-flex-main-flex-end" />
                  </Radio>
                </Tooltip>
                <Tooltip content="与交叉轴两端对齐，轴线之间的间隔平均分布(space-between)">
                  <Radio value="space-between">
                    <IconFont
                      style="transform:rotate(-90deg)"
                      type="icon-flex-main-space-between"
                    />
                  </Radio>
                </Tooltip>
                <Tooltip content="每根轴线两侧的间隔都相等(space-around)">
                  <Radio value="space-around">
                    <IconFont style="transform:rotate(-90deg)" type="icon-flex-main-space-around" />
                  </Radio>
                </Tooltip>
                <Tooltip content="轴线占满整个交叉轴(stretch)">
                  <Radio value="stretch">
                    <IconFont style="transform:rotate(-90deg)" type="icon-flex-main-space-around" />
                  </Radio>
                </Tooltip>
              </Radio.Group>
            </div>
          </CollapseItem>
          <CollapseItem key="1" header="定位">
            <div class="item-wrapper">
              <Tooltip content="display">
                <span class="title">定位方式</span>
              </Tooltip>
              <span class="content">
                <Radio.Group
                  class="position-radio"
                  type="button"
                  size="small"
                  defaultValue="static"
                >
                  <Tooltip content="默认定位(static)">
                    <Radio value="static">默认</Radio>
                  </Tooltip>
                  <Tooltip content="绝对定位(absolute)">
                    <Radio value="absolute">绝对</Radio>
                  </Tooltip>
                  <Tooltip content="相对定位(relative)">
                    <Radio value="relative">相对</Radio>
                  </Tooltip>
                  <Tooltip content="固定(fixed)">
                    <Radio value="fixed">固定</Radio>
                  </Tooltip>
                </Radio.Group>
              </span>
            </div>
          </CollapseItem>
          <CollapseItem key="2" header="边框">
            <div class="item-wrapper">
              <span class="title">样式</span>
              <Radio.Group type="button" size="small" defaultValue="left">
                <Tooltip content="无边框">
                  <Radio value="left">无</Radio>
                </Tooltip>
                <Tooltip content="实线(solid)">
                  <Radio value="solid">
                    <IconFont type="icon-border-solid" />
                  </Radio>
                </Tooltip>
                <Tooltip content="虚线(dashed)">
                  <Radio value="dashed">
                    <IconFont type="icon-border-dashed" />
                  </Radio>
                </Tooltip>
                <Tooltip content="双实线(double)">
                  <Radio value="double">
                    <IconFont type="icon-border-double" />
                  </Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <div class="item-wrapper">
              <span class="title">宽度</span>
              <Input.Group class="content">
                <Input class="left" size="small" />
                <div class="right">
                  <Select size="small" options={["px", "rem"]} defaultValue="px" />
                </div>
              </Input.Group>
            </div>
            <div class="item-wrapper">
              <span class="title">颜色</span>
              <span class="content">
                <Input class="left" size="small" />
                <div class="right">
                  <ColorPicker pickerType="fk" useType="both" />
                </div>
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">圆角</span>
              <span class="content">
                <div class="radius-grid">
                  <span class="radius-group">
                    <Tooltip content="左上角圆角(border-top-left-radius)">
                      <InputNumber
                        class="radius-input"
                        size="small"
                        v-slots={{
                          prepend: () => <IconFont size="16" type="icon-radius-tl" />
                        }}
                      />
                    </Tooltip>
                    <Tooltip position="bottom" content="左下角圆角(border-bottom-left-radius)">
                      <InputNumber
                        class="radius-input"
                        size="small"
                        v-slots={{
                          prepend: () => <IconFont size="16" type="icon-radius-bl" />
                        }}
                      />
                    </Tooltip>
                  </span>
                  <Tooltip content="锁定比例">
                    <span class="relation-icon">
                      <IconFont type="icon-relation" />
                    </span>
                  </Tooltip>
                  <span class="radius-group">
                    <Tooltip content="右上角圆角(border-top-right-radius)">
                      <InputNumber
                        class="radius-input"
                        size="small"
                        v-slots={{
                          prepend: () => <IconFont size="16" type="icon-radius-tr" />
                        }}
                      />
                    </Tooltip>
                    <Tooltip position="bottom" content="右下角圆角(border-bottom-right-radius)">
                      <InputNumber
                        class="radius-input"
                        size="small"
                        v-slots={{
                          prepend: () => <IconFont size="16" type="icon-radius-br" />
                        }}
                      />
                    </Tooltip>
                  </span>
                </div>
              </span>
            </div>
          </CollapseItem>
          <CollapseItem key="3" header="背景">
            <div class="item-wrapper">
              <span class="title">类型</span>
              <Select size="small">
                <Select.Option value="">无背景</Select.Option>
                <Select.Option value="color">颜色背景</Select.Option>
                <Select.Option value="image">图片背景</Select.Option>
              </Select>
            </div>
            <div class="item-wrapper">
              <span class="title">颜色</span>
              <span class="content">
                <Input class="left" size="small" />
                <div class="right">
                  <ColorPicker pickerType="fk" useType="both" />
                </div>
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">链接</span>
              <span class="content">
                <Input class="left" size="small" />
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">尺寸</span>
              <span class="content">
                <Input class="left" size="small" />
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">模式</span>
              <span class="content">
                <Input class="left" size="small" />
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">重复</span>
              <span class="content">
                <Input class="left" size="small" />
              </span>
            </div>
          </CollapseItem>
          <CollapseItem key="4" header="字体">
            <div class="item-wrapper">
              <span class="title">对齐</span>
              <span class="content">
                <Radio.Group type="button" size="small" defaultValue="left">
                  <Tooltip content="左对齐(left)">
                    <Radio value="left">
                      <IconAlignLeft />
                    </Radio>
                  </Tooltip>
                  <Tooltip content="居中对齐(center)">
                    <Radio value="center">
                      <IconAlignCenter />
                    </Radio>
                  </Tooltip>
                  <Tooltip content="左对齐(right)">
                    <Radio value="right">
                      <IconAlignRight />
                    </Radio>
                  </Tooltip>
                  <Tooltip content="两端对齐(justify)">
                    <Radio value="justify">
                      <IconMenu />
                    </Radio>
                  </Tooltip>
                </Radio.Group>
              </span>
            </div>
            <div class="item-wrapper">
              <span class="title">粗细</span>
              <Input.Group class="content">
                <span class="left">
                  <Select
                    size="small"
                    options={[
                      {
                        label: "粗",
                        value: "bold"
                      },
                      {
                        label: "正常",
                        value: "normal"
                      },
                      {
                        label: "细",
                        value: "lighter"
                      },
                      {
                        label: "自定义",
                        value: ""
                      }
                    ]}
                  />
                </span>
                <InputNumber class="right" size="small" />
              </Input.Group>
            </div>
            <div class="item-wrapper">
              <span class="title">字号</span>
              <Input.Group class="content">
                <InputNumber class="left" size="small" defaultValue={16} />
                <div class="right">
                  <Select size="small" options={["px", "rem"]} defaultValue="px" />
                </div>
              </Input.Group>
            </div>
            <div class="item-wrapper">
              <span class="title">行高</span>
              <Input.Group class="content">
                <InputNumber class="left" size="small" />
                <div class="right">
                  <Select class="select" size="small" options={["px", "%"]} defaultValue="px" />
                </div>
              </Input.Group>
            </div>
            <div class="item-wrapper">
              <span class="title">颜色</span>
              <span class="content">
                <Input class="left" size="small" />
                <div class="right">
                  <ColorPicker pickerType="fk" useType="both" />
                </div>
              </span>
            </div>
          </CollapseItem>
          <CollapseItem key="5" header="动态样式"></CollapseItem>
        </Collapse>
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.component-style {
  .item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--color-border-1);
    // &:not(:last-child) {
    // }
    .title {
      flex-shrink: 0;
      font-size: 13px;
      // width: 70px;
      margin-right: 20px;
    }
    .content {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      overflow: auto;
      .position-radio {
        flex-shrink: 0;
      }
      .radius-grid {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .relation-icon {
          margin: 4px;
          font-size: 20px;
          cursor: pointer;
          &:hover,
          &[data-lock="true"] {
            svg {
              color: rgb(var(--primary-6));
              background-color: var(--color-border-1);
            }
          }
        }
        .radius-group {
          display: flex;
          flex-direction: column;
          .radius-input {
            margin: 10px 0;
          }
        }
      }
      :deep(.arco-input-group) {
        flex-grow: 1;
        justify-content: flex-end;
      }
      .left {
        width: 100%;
      }
      .right {
        width: 80px;
        flex-shrink: 0;
        :deep(.vc-color-wrap) {
          width: 100%;
          height: 100%;
          // margin-left: 6px;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
