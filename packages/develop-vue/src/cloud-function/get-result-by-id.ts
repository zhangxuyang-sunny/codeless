import { PlatformThis } from "@codeless/schema";

export default function getResultById(this: PlatformThis, id: string) {
  return this.resultPool[id];
}
