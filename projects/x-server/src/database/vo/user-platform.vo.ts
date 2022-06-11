// 平台用户数据

import { UserInfoPO } from "../po/user-info.po";
import { ProjectVO } from "./project.vo";

// 包含工程数据信息
export class UserPlatformVO extends UserInfoPO {
  projects: ProjectVO[];
}
