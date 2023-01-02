import type { PlatformThis } from "@codeless/schema";
import { get } from "lodash";

export default function (this: PlatformThis, path: string, ...args: unknown[]) {
  const action = get(this.stores.actions, path);
  return action(...args);
}
