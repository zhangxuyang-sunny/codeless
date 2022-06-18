import { PageSchema } from "packages/x-nodes/nodes/PageNode";
import { atom } from "recoil";

export const pagesState = atom<PageSchema[]>({
  key: "page-schema-list",
  default: []
});
