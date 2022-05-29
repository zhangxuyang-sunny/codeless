import path from "node:path";
import fse from "fs-extra";
import { Injectable } from "@nestjs/common";
import { FileService } from "src/modules/file.service";
import { ConfigurationService } from "src/configuration.service";
// import { build } from "packages/x-compiler/src/index";

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

@Injectable()
export class MaterialService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly fileService: FileService
  ) {}
  private get host() {
    return this.configService.getHost();
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

  // 上传物料
  async uploadMaterial(file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file);
    // console.log(build);
    return result;
  }
}
