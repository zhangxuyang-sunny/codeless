export interface UserPO {
  uid: string; // 永远不变的平台用户id
  username: string; // 唯一的用户的登录名
  nickname: string; // 用户昵称
  telephone: string;
  email: `${string | number}@${string}.${string}`;
  projects: string[];
}

// 用户校验信息
export interface UserAuthPO {
  username: string; // 唯一用户的登录名
  password: string; // 加密后的密码
}
