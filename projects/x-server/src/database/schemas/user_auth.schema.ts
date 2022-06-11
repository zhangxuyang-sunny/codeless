import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { database } from "config/database";
import { UserAuthPO } from "../modal/user";

export type UserAuthDocument = UserAuthDO & Document;

@Schema()
export class UserAuthDO implements UserAuthPO {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  password: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuthDO);

// 用于 module.imports 注入 UserAuth 数据库特征
export const UserAuthFeature: ModelDefinition = {
  name: UserAuthDO.name,
  schema: UserAuthSchema,
  collection: database.table_user_auth
};
