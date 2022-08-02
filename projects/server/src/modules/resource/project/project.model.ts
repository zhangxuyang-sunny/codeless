import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProjectStatus } from "@lowcode/types";
import { TypeProjectConfig, IProjectConfigData } from "@lowcode/types";
import { database } from "config/database";

export type ProjectDocument = IProjectConfigData & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true,
  minimize: false
})
export class ProjectModelSchema implements Omit<IProjectConfigData, "createdAt" | "updatedAt"> {
  @Prop({ required: true, immutable: true })
  id: string;

  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  status: ProjectStatus;

  @Prop({ type: Object, required: true })
  config: TypeProjectConfig;

  @Prop({ required: true, immutable: true })
  createdUser: string;

  @Prop()
  updatedUser: string;
}

// 用于 module.imports 注入数据库特征
export const ProjectModel: ModelDefinition = {
  name: ProjectModelSchema.name,
  schema: SchemaFactory.createForClass(ProjectModelSchema),
  collection: database.table_projects
};
