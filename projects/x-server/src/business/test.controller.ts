import { Controller, Get, Query } from "@nestjs/common";
import { QueryListByStatusDTO } from "src/data-modal/dto/QueryListByStatusDTO";

@Controller("test")
export class TestController {
  @Get("hh")
  hh(@Query() query: QueryListByStatusDTO) {
    console.log(query);
    throw new Error("aa");
  }
}
