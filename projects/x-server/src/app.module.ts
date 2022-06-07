import path from "node:path";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MaterialModule } from "./business/material.module";
import { ProjectModule } from "./business/project.module";
import { TestModule } from "./business/test.module";
import { ConfigurationService } from "./services/configuration.service";
import { DatabaseService } from "./services/database.service";
import { TasksModule } from "./schedules/tasks.module";
import { FileModule } from "./modules/file.module";
import { FileService } from "./modules/file.service";
import { UsersModule } from "./business/users.module";
import { AuthModule } from "./auth/auth.module";

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
    // 加载不同环境的配置文件
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV !== "production" ? ".env.development" : ".env.production"
    }),
    // 注册定时任务
    ScheduleModule.forRoot(),
    // 静态资源
    ServeStaticModule.forRoot({
      rootPath: path.resolve("public"),
      // 排除 main.ts 中的 static
      exclude: ["static"]
    }),
    UsersModule,
    AuthModule,
    FileModule,
    TasksModule,
    MaterialModule,
    ProjectModule,
    TestModule,
    AuthModule
  ],
  controllers: [],
  providers: [ConfigService, ConfigurationService, FileService, DatabaseService],
  exports: [ConfigService, ConfigurationService, FileService, DatabaseService]
})
export class AppModule {}
