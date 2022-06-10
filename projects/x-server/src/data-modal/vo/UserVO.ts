import { UserInfoPO } from "../po/UserPO";
import { ProjectVO } from "./ProjectVO";

// 平台用户数据
// 包含工程数据信息
export class UserPlatformVO extends UserInfoPO {
  projects: ProjectVO[];
}
