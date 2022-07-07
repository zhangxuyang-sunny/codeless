import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../modules/configuration/configuration.module";
import { ResourceModule } from "../modules/resource/resource.module";
import { TasksService } from "./tasks.service";

@Module({
  imports: [ConfigurationModule, ResourceModule],
  providers: [TasksService]
})
export class TasksModule {}
