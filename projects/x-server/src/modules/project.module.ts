import { Module } from "@nestjs/common";
import { ProjectController } from "src/controllers/project.controller";
import { DbProjectModule } from "src/database/db.project.module";
import { DbUserModule } from "src/database/db.user.module";
import { DatabaseService } from "src/services/database.service";
import { ProjectService } from "src/services/project.service";
import { ConfigurationModule } from "./configuration.module";
import { FileModule } from "./file.module";
import { UserModule } from "./user.module";

@Module({
  imports: [DbUserModule, DbProjectModule, ConfigurationModule, UserModule, FileModule],
  controllers: [ProjectController],
  providers: [ProjectService, DatabaseService],
  exports: [ProjectService]
})
export class ProjectModule {}
