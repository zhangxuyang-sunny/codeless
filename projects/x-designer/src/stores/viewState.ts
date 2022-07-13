import { atom } from "recoil";
import { IViewSchema } from "packages/x-core/dist/types/page";

export const viewState = atom<IViewSchema | null>({
  key: "view",
  default: null
});
