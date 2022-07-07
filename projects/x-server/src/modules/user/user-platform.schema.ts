import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { database } from "config/database";

export type UserPlatformDocument = UserPlatformPO & Document;

// 平台用户信息
// 关联了用户在平台的数据
@Schema()
export class UserPlatformPO {
  @Prop({ select: false })
  _id?: string;

  @Prop({ select: false })
  __v?: string;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, ref: "projects", type: Types.Array })
  projects: string[];

  @Prop({ required: true })
  views: string[];

  @Prop({ required: true })
  materials: string[];

  @Prop({ required: true })
  teams: string[];
}

export const UserPlatformModel: ModelDefinition = {
  name: UserPlatformPO.name,
  schema: SchemaFactory.createForClass(UserPlatformPO),
  collection: database.table_user_platform
};
