import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { IProjectSchema, IProjectRouter, IProjectDataset } from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";

export type ProjectDocument = ProjectSchema & Document;
@Schema({
  _id: false,
  id: false,
  timestamps: true
})
export class ProjectSchema implements Omit<IProjectSchema, "createdAt" | "updatedAt"> {
  @Prop({ select: false })
  _id?: string;
  @Prop({ select: false })
  __v?: string;
  @Prop({ required: true, immutable: true })
  id: string;
  @Prop({ type: String, required: true })
  version: string;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({})
  description: string;
  @Prop({ required: true, immutable: true })
  createdUser: string;
  @Prop({ required: true })
  updatedUser: string;
  @Prop({ type: Number, required: true })
  status: ProjectStatus;
  @Prop({ type: Object, required: true })
  router: IProjectRouter;
  @Prop({ type: Array, required: true })
  datasets: IProjectDataset[];
}

export const projectSchema = SchemaFactory.createForClass(ProjectSchema);

// 用于 module.imports 注入数据库特征
export const ProjectModel: ModelDefinition = {
  name: ProjectSchema.name,
  schema: projectSchema,
  collection: database.table_projects
};
