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
import { CreateComponentDTO, FindComponentsDTO, UpdateComponentDTO } from "./component.modal";
import { ComponentService } from "./component.service";

@Controller("component")
export class ComponentController {
  constructor(private readonly service: ComponentService) {}

  @Get("list")
  async getList(@Query() findViewsQuery: FindComponentsDTO) {
    return this.service.findComponents(findViewsQuery);
  }

  @Post("create")
  @HttpCode(HttpStatus.OK)
  async createComponent(@Body() createViewDto: CreateComponentDTO) {
    return this.service.createComponent(createViewDto);
  }

  @Patch("update")
  async updateComponent(@Body() updateViewDto: UpdateComponentDTO) {
    return this.service.updateComponent(updateViewDto);
  }

  @Get("ids")
  async getListByIds(@Query("ids", new ParseArrayPipe()) ids: string[]) {
    console.log(ids);
    return this.service.findComponentsByIds(ids);
  }
}
