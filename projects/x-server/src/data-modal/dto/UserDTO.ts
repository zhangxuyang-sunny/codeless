import { UserInfoPO } from "../po/UserPO";

export class RegisterUserDTO {
  username: string;
  password: string;
}

export class CreateUserDTO extends UserInfoPO {}
