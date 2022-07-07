import { Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { IUploadMaterialParams, MaterialService } from "./material.service";

interface IGetListQuery {
  ids: string;
  runtimeCode: boolean;
  sourceCode: boolean;
}

interface IGetDetailByIdQuery {
  id: string;
  runtimeCode: boolean;
  sourceCode: boolean;
}

@Controller("material")
export class MaterialController {
  constructor(private readonly service: MaterialService) {}

  // 获取物料列表
  @Get("list")
  getList(@Query() query: IGetListQuery) {
    return this.service.getList({
      ...query,
      ids: query.ids?.split(",") || []
    });
  }

  // 获取物料详情
  @Get("detail")
  getDetailById(@Query() query: IGetDetailByIdQuery) {
    return this.service.getDetailById(query);
  }

  // 上传物料
  @Post("upload")
  @UseInterceptors(FilesInterceptor("files"))
  uploadMaterial(
    @UploadedFiles() files: Express.Multer.File[],
    @Query() options: IUploadMaterialParams
  ) {
    return this.service.uploadMaterial(files[0], options);
  }
}
