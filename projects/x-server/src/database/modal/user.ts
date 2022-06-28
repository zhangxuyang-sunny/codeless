import { IsArray, IsNotEmpty } from "class-validator";
import { ProjectVO } from "./project";

export class QueryUserDTO {}

// 用户校验信息
export class UserAuthPO {
  readonly uid: string; // 唯一用户 id
  password: string; // 加密后的密码
}

export class UserInfoVO {
  username: string; // 用户登录名称
  nickname: string; // 用户昵称
  email: string | null; // 用户绑定的
  telephone: string | null; // 用户绑定的电话号码
}

export class UserInfoPO extends UserInfoVO {
  readonly uid: string;
}

// 平台用户信息
// 关联了用户在平台的数据
export class UserPlatformPO {
  readonly uid: string;
  readonly projects: string[]; // projectId[]
  readonly materials: string[]; // mid[]
  readonly teams: string[]; // tid[]
}

// 平台用户所关联的业务实体信息
export class UserPlatformVO {
  readonly uid: string;
  readonly projects: ProjectVO[];
  readonly materials: string[];
  readonly teams: string[];
}

// 注册用户传输数据
export class RegisterUserDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

// 用户鉴权
export class CreateUserAuthDTO implements UserAuthPO {
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  password: string;
}

// 创建用户信息
export class CreateUserInfoDTO extends UserInfoVO {
  @IsNotEmpty()
  username: string; // 用户登录名称
  nickname: string; // 用户昵称
  email: string | null; // 用户绑定的
  telephone: string | null; // 用户绑定的电话号码
}

export class CreateUserInfoBO extends CreateUserInfoDTO {
  @IsNotEmpty()
  uid: string;
}

// 平台用户业务数据
export class CreateUserPlatformBO extends UserPlatformPO {}

// 更新平台用户数据
export class UpdateUserPlatformDTO implements CreateUserPlatformBO {
  @IsNotEmpty()
  uid: string;
  @IsArray()
  projects: string[];
  @IsArray()
  materials: string[];
  @IsArray()
  teams: string[];
}
