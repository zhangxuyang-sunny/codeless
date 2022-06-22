import type { PageSchema } from "packages/x-nodes";
import { atom } from "recoil";

export const pagesState = atom<PageSchema[]>({
  key: "page-schema-list",
  default: []
});
