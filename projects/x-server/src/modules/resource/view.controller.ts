import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { CreateViewDTO, QueryViewDTO } from "./view.modal";
import { ViewService } from "./view.service";

@Controller("view")
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get("list")
  async getList(@Query() query: Partial<QueryViewDTO>) {
    return this.viewService.findViewsBy(query);
  }

  @Post("create")
  @HttpCode(HttpStatus.OK)
  async createPage(@Body() data: CreateViewDTO) {
    return this.viewService.createView(data);
  }

  @Get("multi")
  async getListByVIds(@Query("ids") ids: string) {
    const vIds = ids.split(",");
    return this.viewService.findViewsBatch(vIds);
  }
}
