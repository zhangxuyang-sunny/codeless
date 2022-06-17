<script lang="tsx">
import { defineComponent } from "vue";
import { Button, Space } from "@arco-design/web-vue";
import { IconEye, IconHistory, IconSave, IconSend } from "@arco-design/web-vue/es/icon";

export default defineComponent({
  setup() {
    return () => (
      <div class="toolbar">
        <div class="handler">
          <Space size={8}>
            <Button size="small" type="text" v-slots={{ icon: () => <IconSave /> }}>
              保存
            </Button>
            <Button size="small" type="text" v-slots={{ icon: () => <IconHistory /> }}>
              历史记录
            </Button>
            <Button size="small" v-slots={{ icon: () => <IconEye /> }}>
              预览
            </Button>
            <Button size="small" type="primary" v-slots={{ icon: () => <IconSend /> }}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    );
  }
});
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
