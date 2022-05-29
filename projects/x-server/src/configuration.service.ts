import fse from "fs-extra";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// 区分环境的配置都在以下文件中配置，然后通过此服务获取
// root/.env.development
// root/.env.production
@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  // 获取主机名
  getHost() {
    return this.configService.get<string>("HOST");
  }

  // 获取工程数据库嵌入式文件
  // TODO：这是个临时的数据库方案，后面采用 mysql / mongo
  getProjectDBFile() {
    return this.configService.get<string>("PROJECT_DB_FILE");
  }

  // 获取静态文件目录
  getStaticFilesDir() {
    const staticFilesDir = this.configService.get<string>("STATIC_FILES_DIR");
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }

  // 获取资源文件目录，这里包含所有的物料资源
  getStaticResourceDir() {
    const staticFilesDir = this.configService.get<string>("STATIC_RESOURCE_DIR");
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }
}
