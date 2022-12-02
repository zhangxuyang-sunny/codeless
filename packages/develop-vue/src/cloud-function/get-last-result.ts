import type { PlatformThis } from "@codeless/schema";

export default function getLastResult(this: PlatformThis) {
  return this.lastResult;
}
