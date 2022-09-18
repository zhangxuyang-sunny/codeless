<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    logoUrl: {
      type: String,
      default: "/src/assets/icon.png"
    },
    title: {
      type: String,
      default: "未命名标题"
    }
  },
  setup(props) {
    return () => (
      <div class="Logo">
        <img class="logo-img" src={props.logoUrl} />
        <h2 class="title">{props.title}</h2>
      </div>
    );
  }
});
</script>
<style scoped>
.Logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.Logo > .logo-img {
  width: 35px;
  height: 35px;
  margin: 10px;
  outline: 1px solid rgb(219, 219, 219);
  border-radius: 8px;
  overflow: hidden;
}
.Logo > .title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}
</style>
