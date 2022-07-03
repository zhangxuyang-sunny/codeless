import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { database } from "config/database";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { ProjectController } from "./project/project.controller";
import { ProjectModel } from "./project/project.schema";
import { ProjectService } from "./project/project.service";
import { TableProjectService } from "./project/project.table.service";
import { ViewController } from "./view/view.controller";
import { ViewModel } from "./view/view.schema";
import { ViewService } from "./view/view.service";
import { TableViewService } from "./view/view.table.service";
import { DatasetsService } from "./datasets/datasets.service";

@Module({
  imports: [
    MongooseModule.forFeature([ProjectModel, ViewModel], database.db_resource),
    forwardRef(() => UserModule),
    FileModule
  ],
  controllers: [ProjectController, ViewController],
  providers: [ProjectService, TableProjectService, ViewService, TableViewService, DatasetsService],
  exports: [TableProjectService, TableViewService]
})
export class ResourceModule {}
