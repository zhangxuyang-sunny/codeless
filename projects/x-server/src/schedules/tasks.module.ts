import { Module } from "@nestjs/common";
import { ConfigurationModule } from "src/modules/configuration.module";
import { ProjectModule } from "src/modules/resource.module";
import { TasksService } from "./tasks.service";

@Module({
  imports: [ConfigurationModule, ProjectModule],
  providers: [TasksService]
})
export class TasksModule {}
