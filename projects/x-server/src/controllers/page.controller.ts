import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreatePageDTO, QueryPageDTO } from "src/database/modal/page";
import { PageService } from "src/services/page.service";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post("create")
  async createPage(@Body() createPageDto: CreatePageDTO) {
    return this.pageService.createPage(createPageDto);
  }

  @Get("query")
  async getList(@Query() query: Partial<QueryPageDTO>) {
    return this.pageService.findPagesBy(query);
  }

  @Get("multi")
  async getListByVIds(@Query("ids") ids: string) {
    const vIds = ids.split(",");
    return this.pageService.findPagesByVIds(vIds);
  }
}
