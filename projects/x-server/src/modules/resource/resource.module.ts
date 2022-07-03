import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { database } from "config/database";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { ProjectController } from "./project.controller";
import { ProjectModel } from "./project.schema";
import { ProjectService } from "./project.service";
import { TableProjectService } from "./project.table.service";
import { ViewController } from "./view.controller";
import { ViewModel } from "./view.schema";
import { ViewService } from "./view.service";
import { TableViewService } from "./view.table.service";

@Module({
  imports: [
    MongooseModule.forFeature([ProjectModel, ViewModel], database.db_resource),
    forwardRef(() => UserModule),
    FileModule
  ],
  controllers: [ProjectController, ViewController],
  providers: [ProjectService, TableProjectService, ViewService, TableViewService],
  exports: [TableProjectService, TableViewService]
})
export class ResourceModule {}
