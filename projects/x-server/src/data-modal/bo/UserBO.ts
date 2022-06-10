import { UserInfoPO } from "../po/UserPO";

// 用户业务数据
export class UserBO extends UserInfoPO {
  projects: string[]; // 名下工程 id 列表
}
