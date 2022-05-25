<script lang="tsx">
import { Button, Popover, Space } from "@arco-design/web-vue";
import { defineComponent, ref } from "vue";
import type { IconType } from "@icon-park/vue-next/es/all";
import IconParkVue from "packages/x-shared/components/IconPark.vue";
export default defineComponent({
  setup() {
    const tools = ref<Array<{ icon: IconType; name: string }>>([
      {
        icon: "Switch",
        name: "切换账号"
      },
      {
        icon: "Logout",
        name: "退出系统"
      }
    ]);
    const UserAvaTar = () => (
      <img
        alt="avatar"
        class="user-avatar"
        src="https://img1.baidu.com/it/u=3624909041,2918634060&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=500"
      />
    );
    const Descriptions = () => (
      <div class="user-description-container">
        <Space class="user-info" direction="vertical">
          <UserAvaTar />
          <div class="useName">用户名</div>
          <div> X个人版 </div>
        </Space>
        <div class="footer">
          {tools.value.map(item => (
            <Button
              long={true}
              v-slots={{
                icon: () => <IconParkVue type={item.icon} />
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    );

    return () => (
      <Popover
        position="br"
        trigger="click"
        arrowStyle={{ display: "none" }}
        v-slots={{
          content: Descriptions
        }}
      >
        <UserAvaTar />
      </Popover>
    );
  }
});
</script>

<style lang="less" scoped>
.user-avatar {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 6px;
  overflow: hidden;
}
.user-description-container {
  width: 200px;
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .arco-btn {
      margin-bottom: 10px;
      .i-icon {
        margin-right: 15px;
      }
    }
  }
}
</style>
