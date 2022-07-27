import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@ApiTags("File service")
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}
  // 批量上传文件
  @Post("upload")
  @UseInterceptors(FilesInterceptor("files"))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadFiles(files);
  }
}
