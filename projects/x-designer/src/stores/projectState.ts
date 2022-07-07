import { atom } from "recoil";
import { IProjectSchema } from "packages/x-core/dist/types/project";

export const projectState = atom<IProjectSchema | null>({
  key: "project",
  default: null
});
