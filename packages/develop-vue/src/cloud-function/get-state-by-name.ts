import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, name: string) {
  return this.stores[name];
}
