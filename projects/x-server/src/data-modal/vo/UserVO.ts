import { ProjectVO } from "./ProjectVO";

export type UserInfoVO = {
  id: string;
  name: string;
  projects: ProjectVO[];
};

export type CreateUserVO = {
  userName: string;
};
