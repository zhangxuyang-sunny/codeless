import { Module } from "@nestjs/common";
import { CompilerModule } from "@app/compiler";
import { FileService } from "src/modules/file.service";
import { MaterialController } from "./material.controller";
import { MaterialService } from "./material.service";

@Module({
  imports: [CompilerModule],
  controllers: [MaterialController],
  providers: [MaterialService, FileService]
})
export class MaterialModule {}
