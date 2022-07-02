import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import configuration from "config/index";
import { UserPlatformPO } from "../modal/user";

const { database } = configuration();

export type UserPlatformDocument = UserPlatformSchema & Document;

@Schema()
export class UserPlatformSchema extends UserPlatformPO {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true, ref: "projects", type: Types.Array })
  projects: string[];

  @Prop({ required: true })
  views: string[];

  @Prop({ required: true })
  materials: string[];

  @Prop({ required: true })
  teams: string[];
}

export const userPlatformSchema = SchemaFactory.createForClass(UserPlatformSchema);

export const UserPlatformModel: ModelDefinition = {
  name: UserPlatformSchema.name,
  schema: userPlatformSchema,
  collection: database.table_user_platform
};
