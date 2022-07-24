import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { database } from "config/database";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { ProjectController } from "./project/project.controller";
import { ProjectModel } from "./project/project.schema";
import { ProjectService } from "./project/project.service";
import { ComponentController } from "./view/component.controller";
import { ComponentModel } from "./view/component.schema";
import { ComponentService } from "./view/component.service";
import { DatasetsService } from "./datasets/datasets.service";
import { ResourceService } from "./resource.service";
import { ResourceController } from "./resource.controller";

@Module({
  imports: [
    MongooseModule.forFeature([ProjectModel, ComponentModel], database.db_resource),
    forwardRef(() => UserModule),
    FileModule
  ],
  controllers: [ResourceController, ProjectController, ComponentController],
  providers: [ResourceService, ProjectService, ComponentService, DatasetsService],
  exports: [ProjectService]
})
export class ResourceModule {}
