import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export const COLLECTION = "user_auth";

export type UserAuthDocument = UserAuth & Document;

@Schema()
export class UserAuth {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
