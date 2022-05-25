import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigurationService } from "src/configuration.service";
import { DatabaseService } from "src/database.service";
import { TasksService } from "./tasks.service";

@Module({
  providers: [ConfigService, ConfigurationService, DatabaseService, TasksService]
})
export class TasksModule {}
