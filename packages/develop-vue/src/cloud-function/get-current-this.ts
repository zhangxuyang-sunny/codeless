import type { PlatformThis } from "@codeless/schema";

export default function (this: PlatformThis) {
  return this.currentThis;
}
