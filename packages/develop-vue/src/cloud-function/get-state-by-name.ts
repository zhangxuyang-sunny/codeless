import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis, ns: string) {
  return this.store[ns];
}
