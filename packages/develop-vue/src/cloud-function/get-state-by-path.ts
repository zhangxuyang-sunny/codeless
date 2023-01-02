import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";
declare global {
  interface Window {
    vue: typeof import("vue");
  }
}

export default function (this: PlatformThis, path: string, def?: unknown) {
  console.log(this, path);
  return get(this.store, path, def);
}
