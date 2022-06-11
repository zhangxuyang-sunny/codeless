import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { DbProjectService } from "./db.project.service";
import { ProjectFeature } from "./schemas/project.schema";
import { database } from "config/database";

@Module({
  imports: [MongooseModule.forFeature([ProjectFeature], database.db_project)],
  providers: [DbProjectService],
  exports: [DbProjectService]
})
export class DbProjectModule {}
