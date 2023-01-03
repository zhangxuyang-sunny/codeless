import type { PlatformThis } from "@codeless/schema";
import { get } from "lodash";

export default function (this: PlatformThis, path: string, def?: unknown) {
  return get(this.stores.states, path, def);
}
