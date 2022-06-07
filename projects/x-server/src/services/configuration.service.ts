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
  get host() {
    return this.configService.get<string>("HOST");
  }

  // 获取工程db文件路径
  get projectDBFile() {
    return this.configService.get<string>("PROJECT_DB_FILE");
  }

  // 获取用户db文件路径
  get userDBFile() {
    return this.configService.get<string>("USERS_DB_FILE");
  }

  // 获取授权数据库
  get authDBFile() {
    return this.configService.get<string>("AUTH_DB_FILE");
  }

  // 获取静态资源路径
  get staticDir() {
    const staticDir = this.configService.get<string>("STATIC_DIR");
    fse.ensureDirSync(staticDir);
    return staticDir;
  }

  // 获取静态文件目录
  get staticFilesDir() {
    const staticFilesDir = path.resolve(this.staticDir, this.FILES_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }

  // 获取资源文件目录，这里包含所有的物料资源
  get staticMaterialsDir() {
    const staticFilesDir = path.resolve(this.staticDir, this.MATERIALS_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }
}
