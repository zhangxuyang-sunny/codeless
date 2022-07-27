import path from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MongooseModule } from "@nestjs/mongoose";
import { configuration } from "../config/index";
import { TasksModule } from "./schedules/tasks.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { FileModule } from "./modules/file/file.module";
import { MaterialModule } from "./modules/material/material.module";
import { ResourceModule } from "./modules/resource/resource.module";
import { TestModule } from "./modules/test/test.module";

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
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve("public"),
    //   // 排除 main.ts 中的 static
    //   exclude: ["static", "swagger"]
    // }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_user}`, {
      connectionName: database.db_user
    }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_resource}`, {
      connectionName: database.db_resource
    }),
    MongooseModule.forRoot(`${database.host}:${database.port}/${database.db_material}`, {
      connectionName: database.db_material
    }),
    AuthModule,
    UserModule,
    FileModule,
    TasksModule,
    MaterialModule,
    ResourceModule,
    TestModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
