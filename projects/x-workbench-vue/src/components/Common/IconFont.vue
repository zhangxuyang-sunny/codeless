<script lang="tsx">
import { defineComponent } from "vue";
import { Icon } from "@arco-design/web-vue";

const src = "//at.alicdn.com/t/font_3168021_1fx68qpia0c.js";
const IconFont = Icon.addFromIconFontCn({ src });

export default defineComponent<InstanceType<typeof IconFont>["$props"]>({
  setup() {
    return () => <IconFont />;
  }
});
</script>
