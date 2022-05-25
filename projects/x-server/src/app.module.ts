import path from "node:path";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MaterialModule } from "./business/material.module";
import { ProjectModule } from "./business/project.module";
import { TestModule } from "./business/test.module";
import { ConfigurationService } from "./configuration.service";
import { DatabaseService } from "./database.service";
import { TasksModule } from "./schedules/tasks.module";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
    }
  }
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV !== "production" ? ".env.development" : ".env.production"
    }),
    ScheduleModule.forRoot(),
    // 静态资源
    ServeStaticModule.forRoot({
      rootPath: path.resolve("public"),
      exclude: ["static"]
    }),
    TasksModule,
    MaterialModule,
    ProjectModule,
    TestModule
  ],
  controllers: [],
  providers: [ConfigService, ConfigurationService, DatabaseService],
  exports: [ConfigService, ConfigurationService, DatabaseService]
})
export class AppModule {}
