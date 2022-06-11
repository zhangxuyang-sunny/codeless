import path from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./services/database.service";
import { TasksModule } from "./schedules/tasks.module";
import { FileModule } from "./modules/file.module";
import { configuration } from "../config/index";
import { AuthModule } from "./modules/auth.module";
import { UserModule } from "./modules/user.module";
import { MaterialModule } from "./modules/material.module";
import { ProjectModule } from "./modules/project.module";
import { TestModule } from "./modules/test.module";
import { ConfigurationModule } from "./modules/configuration.module";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
    }
  }
}

const { database } = configuration();

// @Global()
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
    ConfigurationModule,
    AuthModule,
    UserModule,
    FileModule,
    TasksModule,
    MaterialModule,
    ProjectModule,
    TestModule
  ],
  controllers: [],
  providers: [DatabaseService]
})
export class AppModule {}
