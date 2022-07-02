import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { database } from "config/database";
import { UserInfoPO } from "../modal/user";

export type UserInfoDocument = UserInfoDO & Document;

@Schema()
export class UserInfoDO implements UserInfoPO {
  @Prop({ required: true, unique: true, immutable: true })
  uid: string;

  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ type: String, default: null })
  email: string | null;

  @Prop({ type: String, default: null })
  telephone: string | null;

  @Prop({ required: true, select: false })
  password: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfoDO);

// 用于 module.imports 注入 UserAuth 数据库特征
export const UserInfoFeature: ModelDefinition = {
  name: UserInfoDO.name,
  schema: UserInfoSchema,
  collection: database.table_user_info
};
