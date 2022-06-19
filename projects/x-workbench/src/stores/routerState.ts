import { atom } from "recoil";
import { RouterNode, RouterSchema } from "packages/x-nodes/dist/nodes/RouterNode";

export const routerState = atom<RouterSchema>({
  key: "router-schema",
  default: new RouterNode().getSchema()
});
