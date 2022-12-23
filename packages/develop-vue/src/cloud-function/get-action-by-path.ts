import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, path: string, def?: unknown) {
  return get(this.store.actions, path, def);
}
