import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import configuration from "config/index";
import { UserPlatformPO } from "../modal/user";

const { database } = configuration();

export type UserPlatformDocument = UserPlatformDO & Document;

@Schema()
export class UserPlatformDO extends UserPlatformPO {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  projects: string[];

  @Prop({ required: true })
  materials: string[];

  @Prop({ required: true })
  teams: string[];
}

export const UserPlatformSchema = SchemaFactory.createForClass(UserPlatformDO);

export const UserPlatformFeature: ModelDefinition = {
  name: UserPlatformDO.name,
  schema: UserPlatformSchema,
  collection: database.table_user_platform
};
