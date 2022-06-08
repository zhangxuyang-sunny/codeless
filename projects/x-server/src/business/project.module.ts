import { Module } from "@nestjs/common";
import { FileModule } from "src/modules/file.module";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { UsersService } from "./users.service";

@Module({
  imports: [FileModule],
  controllers: [ProjectController],
  providers: [ProjectService, UsersService]
})
export class ProjectModule {}
