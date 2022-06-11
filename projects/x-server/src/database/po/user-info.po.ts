// 用户信息，不包含业务
export class UserInfoPO {
  uid: string; // 平台生成不可变 user id，简称 uid
  username: string; // 用户登录名称
  nickname: string; // 用户昵称
  email: `${string | number}@${string}.${string}` | null; // 用户绑定的
  telephone: string | null; // 用户绑定的电话号码
}
