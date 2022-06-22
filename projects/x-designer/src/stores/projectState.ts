import { atom } from "recoil";
import { ProjectNode, ProjectSchema } from "packages/x-nodes";

export const projectState = atom<ProjectSchema>({
  key: "project-schema",
  default: new ProjectNode().getSchema()
});
