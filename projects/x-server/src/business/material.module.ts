import { Module } from "@nestjs/common";
import { FileService } from "src/modules/file.service";
import { MaterialController } from "./material.controller";
import { MaterialService } from "./material.service";

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, FileService]
})
export class MaterialModule {}
