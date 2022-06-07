import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { UsersService } from "./users.service";

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, UsersService]
})
export class ProjectModule {}
