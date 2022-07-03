import path from "path";
import fse from "fs-extra";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  private getFileByKey(key: string) {
    const file = this.configService.get<string>(key);
    if (!file) {
      throw new HttpException(`${key} 异常`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return file;
  }
  // 获取主机名
  get host() {
    return this.getFileByKey("host");
  }

  // 用户授权 db
  get db_user_auth() {
    return this.getFileByKey("DB_USER_AUTH");
  }

  // 用户 db
  get db_user_info() {
    return this.getFileByKey("DB_USER_INFO");
  }

  // 平台用户 db
  get db_user_platform() {
    return this.getFileByKey("DB_USER_PLATFORM");
  }

  // 物料 db
  get db_material() {
    return this.getFileByKey("DB_MATERIAL");
  }

  // 工程 db
  get db_project() {
    return this.getFileByKey("DB_PROJECT");
  }

  // 静态资源路径
  get static_dir() {
    const staticDir = this.getFileByKey("STATIC_DIR");
    fse.ensureDirSync(staticDir);
    return staticDir;
  }

  // 静态文件目录
  get static_files_dir() {
    const staticFilesDir = path.resolve(this.static_dir, this.FILES_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }

  // 资源文件目录，这里包含所有的物料资源
  get static_materials_dir() {
    const staticFilesDir = path.resolve(this.static_dir, this.MATERIALS_DIRNAME);
    fse.ensureDirSync(staticFilesDir);
    return staticFilesDir;
  }
}
