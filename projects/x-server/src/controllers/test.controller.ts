import { Controller, Get, Query } from "@nestjs/common";

@Controller("test")
export class TestController {
  @Get("hh")
  hh(@Query() query: Record<string, string>) {
    console.log(query);
    throw new Error("aa");
  }
}
