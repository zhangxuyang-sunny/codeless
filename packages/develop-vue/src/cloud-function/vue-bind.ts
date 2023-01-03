import { PlatformThis } from "@codeless/schema";
import { get } from "lodash";

export default function (this: PlatformThis, path: string) {
  if (this.framework !== "vue") {
    throw new Error("Current framework is not 'vue'");
  }
  return (this.package as typeof import("vue")).computed(() =>
    get(this.stores.states, path)
  );
}
