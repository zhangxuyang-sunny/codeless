import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("测试用")
@Controller("test")
export class TestController {
  @Get("hh")
  hh(@Query() query: Record<string, string>) {
    console.log(query);
    throw new Error("aa");
  }
}
