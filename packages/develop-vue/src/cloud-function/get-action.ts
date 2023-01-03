import { get } from "lodash";
import type { PlatformThis } from "@codeless/schema";

export default function (
  this: PlatformThis,
  name: string,
  path: string,
  def?: unknown
) {
  return get(this.stores.actions[name], path, def);
}
