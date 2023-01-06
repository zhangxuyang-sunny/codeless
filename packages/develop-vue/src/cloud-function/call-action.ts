import type { PlatformThis } from "@codeless/schema";
import { get } from "lodash";

export default function (
  this: PlatformThis,
  name: string,
  path: string,
  ...args: unknown[]
) {
  const action = get(this.stores.actions[name], path);
  return action(...args);
}
