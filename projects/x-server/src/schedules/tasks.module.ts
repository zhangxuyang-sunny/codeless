import { Module } from "@nestjs/common";
import { ConfigurationModule } from "src/modules/configuration.module";
import { DatabaseService } from "src/services/database.service";
import { TasksService } from "./tasks.service";

@Module({
  imports: [ConfigurationModule],
  providers: [DatabaseService, TasksService]
})
export class TasksModule {}
