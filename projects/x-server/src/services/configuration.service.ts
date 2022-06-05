import path from "path";
import fse from "fs-extra";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// TODO：这是个临时的数据库方案，后面采用 mysql / mongo
// 区分环境的配置都在以下文件中配置，然后通过此服务获取
// root/.env.development
// root/.env.production
@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}
  MATERIALS_DIRNAME = "materials";
  FILES_DIRNAME = "files";
  // 获取主机名
  getHost() {
    return this.configService.get<string>("HOST");
  }

  // 获取工程db文件路径
  getProjectDBFile() {
    return this.configService.get<string>("PROJECT_DB_FILE");
  }

  // 获取用户db文件路径
  getUserDBFile() {
    return this.configService.get<string>("USER_DB_FILE");
  }

  // 获取静态资源路径
  getStaticDir() {
    const staticDir = this.configService.get<string>("STATIC_DIR");
    fse.ensureDirSync(staticDir);
    return staticDir;
  }

  // 获取静态文件目录
  getStaticFilesDir() {
    const staticFilesDir = path.resolve(this.getStaticDir(), this.FILES_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }

  // 获取资源文件目录，这里包含所有的物料资源
  getStaticMaterialsDir() {
    const staticFilesDir = path.resolve(this.getStaticDir(), this.MATERIALS_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }
}
