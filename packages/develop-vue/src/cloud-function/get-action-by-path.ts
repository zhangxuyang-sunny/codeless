import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, path: string, def?: unknown) {
  console.log("get-action-by-path", this.stores, path, def);
  return get(this.stores.actions, path, def);
}
