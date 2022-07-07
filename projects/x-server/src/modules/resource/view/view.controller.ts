import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { CreateViewDTO, FindViewsDTO, UpdateViewDTO } from "./view.modal";
import { ViewService } from "./view.service";

@Controller("view")
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get("list")
  async getList(@Query() findViewsQuery: FindViewsDTO) {
    return this.viewService.findViews(findViewsQuery);
  }

  @Post("create")
  @HttpCode(HttpStatus.OK)
  async createView(@Body() createViewDto: CreateViewDTO) {
    return this.viewService.createView(createViewDto);
  }

  @Patch("update")
  async updateView(@Body() updateViewDto: UpdateViewDTO) {
    return this.viewService.updateView(updateViewDto);
  }

  @Get("ids")
  async getListByVIds(@Query("ids", new ParseArrayPipe()) ids: string[]) {
    console.log(ids);
    return this.viewService.findViewsByIds(ids);
  }
}
