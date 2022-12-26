import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, path: string, def?: unknown) {
  console.log("get-action-by-path", this.store, path, def);
  return get(this.store.actions, path, def);
}
