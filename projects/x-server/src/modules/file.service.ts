import path from "path";
import md5 from "md5";
import fse from "fs-extra";
import { createWriteStream } from "fs";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "src/configuration.service";

@Injectable()
export class FileService {
  constructor(private configurationService: ConfigurationService) {}
  // 上传文件
  async uploadFile(file: Express.Multer.File) {
    const staticFileDir = this.configurationService.getStaticFilesDir();
    const filepath = path.join(staticFileDir, md5(file.buffer) + path.extname(file.originalname));
    const result = {
      path: filepath,
      name: file.originalname, // TODO 中文编码问题如何解决
      size: file.size,
      mimetype: file.mimetype
    };
    // 重复文件直接返回
    if (fse.pathExistsSync(filepath)) {
      return Promise.resolve(result);
    }
    const writeStream = createWriteStream(filepath, { autoClose: true });
    return new Promise<typeof result>((resolve, reject) => {
      writeStream.write(file.buffer, err => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  // 批量上传文件
  async uploadFiles(files: Array<Express.Multer.File>) {
    return Promise.all(files.map(file => this.uploadFile(file)));
  }
}
