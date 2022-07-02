import { Module } from "@nestjs/common";
import { DbResourceModule } from "src/database/db.resource.module";
import { DbUserModule } from "src/database/db.user.module";
import { ProjectController } from "src/controllers/project.controller";
import { ProjectService } from "src/services/project.service";
import { ConfigurationModule } from "./configuration.module";
import { FileModule } from "./file.module";
import { UserModule } from "./user.module";

@Module({
  imports: [ConfigurationModule, DbUserModule, DbResourceModule, UserModule, FileModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [DbResourceModule, ProjectService]
})
export class ProjectModule {}
