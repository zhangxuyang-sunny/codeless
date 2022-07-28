import path from "path";
import { NestFactory } from "@nestjs/core";
import { VersioningType, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { serverPort } from "config/constant";
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

  // swagger
  const options = new DocumentBuilder()
    .setTitle("xCoder 低代码引擎")
    .setDescription("xCoder 低代码引擎API文档")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(serverPort);
  console.log(`Project is running on: ${await app.getUrl()}`);
}
bootstrap();
