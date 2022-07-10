import type { DefineComponent } from "vue";
const { defineAsyncComponent } = await System.import<typeof import("vue")>("vue");

export default function loadRemoteComponent<PropsOptions>(
  src: string
): DefineComponent<PropsOptions> {
  console.log(`加载组件 src=${src}`);
  return defineAsyncComponent({
    errorComponent: () => "加载错误",
    // loadingComponent: () => '加载中',
    loader: () => System.import(src),
    onError: (err, retry) => {
      console.error(err);
      console.error(`[loadRemoteModule] 远程组件加载失败, src=${src}`);
    }
  });
}

export { loadRemoteComponent };
