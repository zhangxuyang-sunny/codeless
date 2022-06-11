import path from "node:path";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MongooseModule } from "@nestjs/mongoose";
import { MaterialModule } from "./business/material.module";
import { ProjectModule } from "./business/project.module";
import { TestModule } from "./business/test.module";
import { ConfigurationService } from "./services/configuration.service";
import { DatabaseService } from "./services/database.service";
import { TasksModule } from "./schedules/tasks.module";
import { FileModule } from "./modules/file.module";
import { UsersModule } from "./business/users.module";
import { AuthModule } from "./auth/auth.module";
import configuration from "../config/index";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
    }
  }
}

const { database } = configuration();

@Global()
@Module({
  imports: [
    // 加载不同环境的配置文件
    ConfigModule.forRoot({
      envFilePath: [
        ".env.common",
        process.env.NODE_ENV !== "production" ? ".env.development" : ".env.production"
      ],
      load: [configuration]
    }),

    // 注册定时任务
    ScheduleModule.forRoot(),
    // 静态资源
    ServeStaticModule.forRoot({
      rootPath: path.resolve("public"),
      // 排除 main.ts 中的 static
      exclude: ["static"]
    }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_user}`, {
      connectionName: database.db_user
    }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_project}`, {
      connectionName: database.db_project
    }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_material}`, {
      connectionName: database.db_material
    }),
    AuthModule,
    UsersModule,
    FileModule,
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
