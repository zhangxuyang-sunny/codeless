import path from "node:path";
import md5 from "md5";
import fse from "fs-extra";
import ChildProcess from "node:child_process";
import { v4 as uuid } from "uuid";
import { Injectable } from "@nestjs/common";
import { FileService } from "src/modules/file.service";
import { CompilerService } from "src/services/compiler.service";
import { ConfigurationService } from "src/services/configuration.service";

interface IGetListParams {
  ids: string[];
  runtimeCode: boolean;
  sourceCode: boolean;
}

interface IGetDetailParams {
  id: string;
  runtimeCode: boolean;
  sourceCode: boolean;
}

export interface IUploadMaterialParams {
  type: "vue" | "react" | "module";
}

@Injectable()
export class MaterialService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly fileService: FileService,
    private readonly compilerService: CompilerService
  ) {}
  private get host() {
    return this.configService.host;
  }
  // 获取物料列表
  getList(params: IGetListParams) {
    const { ids, runtimeCode, sourceCode } = params;
    return ids.flatMap(id => {
      const data = this.getDetailById({ id, runtimeCode, sourceCode });
      return data ? [data] : [];
    });
  }

  // 通过 id 获取物料详情
  getDetailById(params: IGetDetailParams) {
    const { id, runtimeCode, sourceCode } = params;
    const dir = path.resolve("public/materials", id);
    if (!fse.existsSync(dir)) {
      // throw new Error(`物料 "${id}" 不存在`);
      console.warn(`物料 "${id}" 不存在`);
      return null;
    }
    const description = path.resolve(dir, "description.json");
    if (!fse.existsSync(dir)) {
      // throw new Error(`物料 "${id}" 不存在描述文件 description.json`);
      console.warn(`物料 "${id}" 不存在描述文件 description.json`);
      return null;
    }
    return {
      id,
      url: `http://${this.host}/public/materials/${id}/index.js`,
      description: fse.readJsonSync(description),
      sourceUrl: `/public/materials/${id}/index.vue`,
      runtimeUrl: `/public/materials/${id}/index.js`,
      sourceCode: sourceCode ? fse.readFileSync(path.resolve(dir, "index.vue"), "utf-8") : null,
      runtimeCode: runtimeCode ? fse.readFileSync(path.resolve(dir, "index.js"), "utf-8") : null
    };
  }

  /**
   * 上传物料
   * @param file
   * @param options type: vue | react | module
   * @returns
   */
  async uploadMaterial(file: Express.Multer.File, options: IUploadMaterialParams) {
    const version = md5(file.buffer);
    const id = uuid();
    const result = await this.fileService.uploadFile(file, {
      pathname: `${this.configService.MATERIALS_DIRNAME}/${id}/versions/${version}/index.source.vue`
    });
    // 当前物料路径
    const root = path.join(this.configService.static_materials_dir, id);
    // 复制构建脚本
    fse.copySync(path.resolve("builders/vue"), root);
    // 后台加载依赖
    ChildProcess.exec("pnpm i", async () => {
      console.log("初始化完成");
      // 执行构建
      await this.compilerService.buildVueComponent({ root, version });
      console.log("构建完成");
      // TODO 同步物料状态到数据
    });
    return result;
  }
}
