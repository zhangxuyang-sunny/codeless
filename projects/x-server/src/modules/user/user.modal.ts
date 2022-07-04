import { IsArray, IsNotEmpty } from "class-validator";

// 注册用户传输数据
export class RegisterUserDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

// 创建用户信息
export class CreateUserInfoDTO {
  @IsNotEmpty()
  username: string; // 用户登录名称
  nickname: string; // 用户昵称
  email: string | null; // 用户绑定的
  telephone: string | null; // 用户绑定的电话号码
}

// 更新平台用户数据
export class UpdateUserPlatformDTO {
  @IsNotEmpty()
  id: string;
  @IsArray()
  projects?: string[];
  @IsArray()
  views?: string[];
  @IsArray()
  materials?: string[];
  @IsArray()
  teams?: string[];
}

// 查找用户
export class FindUserDTO {
  @IsNotEmpty()
  id: string;
}
