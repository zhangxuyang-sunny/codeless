import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResourceService } from "./resource.service";

@ApiTags("Resource")
@Controller("resource")
export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  @Get("/")
  async getResource() {
    return this.service.getResource();
  }
}
