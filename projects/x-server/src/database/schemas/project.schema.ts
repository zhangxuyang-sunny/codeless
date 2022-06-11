import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { database } from "config/database";
import { ProjectSchema } from "packages/x-nodes";
import { ProjectPO } from "../modal/project";

export type ProjectDocument = ProjectDO & Document;

export const enum ProjectStatus {
  normal = 1, // 正常状态
  unlink = -1, // 软删除
  delete = -2 // 自状态变为 -2 一定时间后，将会彻底从数据库移除
}

@Schema()
export class ProjectDO implements ProjectPO {
  @Prop({ required: true })
  pid: string;
  @Prop({ required: true })
  createUser: string;
  @Prop({ required: true })
  updateUser: string;
  @Prop({ type: Number, required: true })
  status: ProjectStatus;
  // schema
  @Prop({ type: Object, required: true })
  schema: ProjectSchema;
}

export const ProjectDOSchema = SchemaFactory.createForClass(ProjectDO);

// 用于 module.imports 注入数据库特征
export const ProjectFeature: ModelDefinition = {
  name: ProjectDO.name,
  schema: ProjectDOSchema,
  collection: database.table_projects
};
