<script lang="tsx">
/* eslint-disable vue/one-component-per-file */
// import type { Widget } from "packages/x-editor/src";
// import type { PropType } from "vue";
import loadRemoteComponent from "packages/x-shared/utils/loadRemoteComponent";

const {
  createApp, //
  defineComponent,
  defineAsyncComponent
} = await System.import<typeof import("vue")>("vue");
export default defineComponent({
  props: {
    widget: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const mSlots = Object.entries(props.widget.slots) // // //
      .reduce(function (previousValue, [slotName, slot]) {
        previousValue[slotName] = () => slots.default?.();
        return previousValue;
      }, {} as Record<string, any>);

    console.log(mSlots, 78907890);

    const app = createApp({
      setup() {
        const Content = loadRemoteComponent(props.widget.src);
        return () => <Content v-slots={mSlots} />;
      }
    });

    return () => (
      <div
        ref={async el => {
          app.mount(el as Element | string);
        }}
      ></div>
    );
  }
});
</script>
