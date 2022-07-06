import { Controller, Get } from "@nestjs/common";
import { ResourceService } from "./resource.service";

@Controller("resource")
export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  @Get("/")
  async getResource() {
    return this.service.getResource();
  }
}
