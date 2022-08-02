import type { DefineComponent } from "vue";

const {
  defineAsyncComponent //
} = await System.import<typeof import("vue")>("vue");

export default function loadRemoteComponent<T>(url: string): DefineComponent<T> {
  return defineAsyncComponent(() => System.import(url));
}
