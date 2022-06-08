import { UserPO } from "../po/UserPO";
import { ProjectVO } from "./ProjectVO";

export type UserInfoVO = Omit<UserPO, "projects"> & {
  projects: ProjectVO[];
};
