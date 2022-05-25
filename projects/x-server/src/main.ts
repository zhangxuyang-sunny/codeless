import path from "path";
import { NestFactory } from "@nestjs/core";
import { VersioningType, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./exception-filters/AllExceptionsFilter";
import { TransformResponse } from "./interceptor/TransformResponse";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["debug", "error", "log", "verbose", "warn"]
  });
  // 允许跨域
  app.enableCors();
  // 静态资源
  // process.cwd() 为命令启动路径，应在 x-server 下
  app.useStaticAssets(path.resolve(process.cwd(), "../../static"), { prefix: "/static" });
  // 全局前缀
  app.setGlobalPrefix("api");
  // 使用版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1" // 默认为 api/v1 版本
  });
  // 验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  // 统一的返回结构
  app.useGlobalInterceptors(new TransformResponse());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
