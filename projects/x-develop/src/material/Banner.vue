<script lang="tsx">
import { defineComponent } from "vue";
import { InputSearch, Button } from "@arco-design/web-vue";

export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="material-banner">
          <div class="desc">
            <h2 class="title">物料平台</h2>
            <div>
              <span>创作与管理定制化组件、区块与页面</span>
              <Button type="outline" class="docs-button">
                阅读文档
              </Button>
            </div>
            <InputSearch
              class="search-input"
              v-slots={{
                prefix: () => {
                  return <icon-user />;
                },
              }}
            />
          </div>
        </div>
      </>
    );
  },
});
</script>

<style lang="less" scoped>
.material-banner {
  position: relative;
  width: 100%;
  min-width: 1300px;
  height: 369px;
  margin-bottom: 64px;
  background-color: rgba(233, 234, 235, 1);
  color: #000;
  .title {
    font-size: 50px;
    margin-bottom: 0;
  }
  .desc {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-150px, -50%);
    z-index: 1;
  }
  .docs-button {
    color: #000;
    border-color: #000;
    margin: 32px 0 34px 18px;
  }
  .search-input {
    width: 374px;
    height: 48px;
    line-height: 48px;
    box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
    background-color: #fff;
  }
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 1300px;
    height: 100%;
    background: url(https://lf-cdn-tos.bytescm.com/obj/static/arco-design/material/platform/8d2cbba90ae7de3a78d4.png)
      100% / contain no-repeat;
  }
}
</style>
