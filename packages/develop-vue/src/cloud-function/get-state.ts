import type { PlatformThis } from "@codeless/schema";
import { get } from "lodash";

export default function (
  this: PlatformThis,
  name: string,
  path: string,
  def?: unknown
) {
  return get(this.stores.states[name], path, def);
}
