import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { database } from "config/database";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { ProjectController } from "./project/project.controller";
import { ProjectModel } from "./project/project.model";
import { ProjectService } from "./project/project.service";
import { ComponentController } from "./component/component.controller";
import { ComponentModel } from "./component/component.schema";
import { ComponentService } from "./component/component.service";
import { DatasetService } from "./dataset/dataset.service";
import { ResourceService } from "./resource.service";
import { ResourceController } from "./resource.controller";

@Module({
  imports: [
    MongooseModule.forFeature([ProjectModel, ComponentModel], database.db_resource),
    forwardRef(() => UserModule),
    FileModule
  ],
  controllers: [ResourceController, ProjectController, ComponentController],
  providers: [ResourceService, ProjectService, ComponentService, DatasetService],
  exports: [ProjectService]
})
export class ResourceModule {}
