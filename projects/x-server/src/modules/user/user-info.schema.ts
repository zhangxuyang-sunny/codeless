import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { database } from "config/database";
import { UserInfo } from "packages/x-core/src/types/user";

export type UserInfoDocument = UserInfoPO & Document;

@Schema()
export class UserInfoPO implements UserInfo {
  @Prop({ select: false })
  _id?: string;

  @Prop({ select: false })
  __v?: string;

  @Prop({ required: true, unique: true, immutable: true })
  id: string;

  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ type: String, default: null })
  email: string | null;

  @Prop({ type: String, default: null })
  telephone: string | null;

  // 不允许对外暴露
  @Prop({ required: true, select: false })
  password: string;
}

// 用于 module.imports 注入 UserAuth 数据库特征
export const UserInfoModel: ModelDefinition = {
  name: UserInfoPO.name,
  schema: SchemaFactory.createForClass(UserInfoPO),
  collection: database.table_user_info
};
