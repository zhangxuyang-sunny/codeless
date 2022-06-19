import { atom } from "recoil";
import { ProjectNode, ProjectSchema } from "packages/x-nodes/nodes/ProjectNode";

export const projectState = atom<ProjectSchema>({
  key: "project-schema",
  default: new ProjectNode().getSchema()
});
