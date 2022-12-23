import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, path: string, ...args: unknown[]) {
  const action = get(this.store.actions, path);
  return action(...args);
}
