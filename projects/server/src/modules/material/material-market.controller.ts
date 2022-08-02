import { Controller, Get } from "@nestjs/common";

@Controller("material-market")
export class MaterialMarketController {
  @Get("list")
  materialList() {
    return [];
  }
}
