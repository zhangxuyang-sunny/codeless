import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { database } from "config/database";
import { TableProjectService } from "./table.project.service";
import { TablePageService } from "./table.page.service";
import { ProjectFeature } from "./schemas/project.schema";
import { PageFeature } from "./schemas/page.schema";

@Module({
  imports: [MongooseModule.forFeature([ProjectFeature, PageFeature], database.db_project)],
  providers: [TableProjectService, TablePageService],
  exports: [TableProjectService, TablePageService]
})
export class DbProjectModule {}
