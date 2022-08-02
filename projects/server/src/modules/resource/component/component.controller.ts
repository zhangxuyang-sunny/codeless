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
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ComponentVO } from "./component.entity";
import { CreateComponentDTO, FindComponentsDTO, UpdateComponentDTO } from "./component.modal";
import { ComponentService } from "./component.service";

@ApiTags("Components")
@Controller("component")
export class ComponentController {
  constructor(private readonly service: ComponentService) {}

  @Get("list")
  @ApiOkResponse({ type: [ComponentVO] })
  async getList(@Query() findViewsQuery: FindComponentsDTO) {
    return this.service.findComponents(findViewsQuery);
  }

  @Post("create")
  @ApiOkResponse({ type: ComponentVO })
  @HttpCode(HttpStatus.OK)
  async createComponent(@Body() createViewDto: CreateComponentDTO) {
    return this.service.createComponent(createViewDto);
  }

  @Patch("update")
  @ApiOkResponse({ type: ComponentVO })
  async updateComponent(@Body() updateViewDto: UpdateComponentDTO) {
    return this.service.updateComponent(updateViewDto);
  }

  @Get("ids")
  @ApiOkResponse({ type: [ComponentVO] })
  async getListByIds(@Query("ids", new ParseArrayPipe()) ids: string[]) {
    console.log(ids);
    return this.service.findComponentsByIds(ids);
  }
}
