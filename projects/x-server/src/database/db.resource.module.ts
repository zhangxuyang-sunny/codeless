import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { database } from "config/database";
import { TableProjectService } from "./table.project.service";
import { TableViewService } from "./table.view.service";
import { ProjectModel } from "./schemas/project.schema";
import { ViewModel } from "./schemas/view.schema";

@Module({
  imports: [MongooseModule.forFeature([ProjectModel, ViewModel], database.db_resource)],
  providers: [TableProjectService, TableViewService],
  exports: [TableProjectService, TableViewService]
})
export class DbResourceModule {}
