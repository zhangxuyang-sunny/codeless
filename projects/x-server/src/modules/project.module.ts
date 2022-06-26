import { Module } from "@nestjs/common";
import { DbProjectModule } from "src/database/db.project.module";
import { DbUserModule } from "src/database/db.user.module";
import { PageController } from "src/controllers/page.controller";
import { ProjectController } from "src/controllers/project.controller";
import { ProjectService } from "src/services/project.service";
import { DatabaseService } from "src/services/database.service";
import { ConfigurationModule } from "./configuration.module";
import { FileModule } from "./file.module";
import { UserModule } from "./user.module";
import { PageService } from "src/services/page.service";

@Module({
  imports: [ConfigurationModule, DbUserModule, DbProjectModule, UserModule, FileModule],
  controllers: [ProjectController, PageController],
  providers: [ProjectService, PageService, DatabaseService],
  exports: [ProjectService, PageService]
})
export class ProjectModule {}
