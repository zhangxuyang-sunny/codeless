import { UserInfoPO } from "./user-info.po";

// 平台用户持久化数据
export class UserPlatformPO extends UserInfoPO {
  projects: string[];
}
