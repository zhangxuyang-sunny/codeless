import path from "path";
import md5 from "md5";
import fse from "fs-extra";
import { createWriteStream } from "fs";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "src/services/configuration.service";

// 文件服务，所有文件都基于 static 为根路径向下展开的
// 不要使用 "../" 向前推进
@Injectable()
export class FileService {
  constructor(private configurationService: ConfigurationService) {}
  /**
   * 上传文件
   * @param file
   * @param options pathname: 相对于 static 的路径
   */
  async uploadFile(file: Express.Multer.File, options: { pathname: string }) {
    if (options.pathname.startsWith("..")) {
      throw new Error(`can not use relative path "${options.pathname}" to save file`);
    }
    const filepath = path.resolve(this.configurationService.getStaticDir(), options.pathname);
    const result = {
      path: options.pathname,
      name: file.originalname, // TODO 中文编码问题如何解决
      size: file.size,
      mimetype: file.mimetype
    };
    // 重复文件直接返回
    if (fse.pathExistsSync(filepath)) {
      return Promise.resolve(result);
    }
    // 确保目录存在
    fse.ensureDirSync(path.dirname(filepath));
    // 写入文件
    const writeStream = createWriteStream(filepath, { autoClose: true });
    return new Promise<typeof result>((resolve, reject) => {
      writeStream.write(file.buffer, err => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  // 向指定目录添加文件
  async uploadFileTo(file: Express.Multer.File, pathname: string) {
    return this.uploadFile(file, { pathname });
  }
  // 批量上传文件
  async uploadFiles(files: Array<Express.Multer.File>) {
    return Promise.all(
      files.map(file =>
        this.uploadFile(file, {
          pathname: path.join("resource", md5(file.buffer) + path.extname(file.filename))
        })
      )
    );
  }
}
