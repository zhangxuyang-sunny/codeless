import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResourceVO } from "./entities/resource.entity";
import { ResourceService } from "./resource.service";

@ApiTags("Resource")
@Controller("resource")
export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  @Get("/")
  @ApiOkResponse({ type: ResourceVO })
  async getResource() {
    return this.service.getResource();
  }
}
