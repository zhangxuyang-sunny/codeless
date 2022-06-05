import { Module } from "@nestjs/common";
import { CompilerService } from "src/services/compiler.service";
import { FileModule } from "src/modules/file.module";
import { MaterialController } from "./material.controller";
import { MaterialService } from "./material.service";

@Module({
  imports: [FileModule],
  controllers: [MaterialController],
  providers: [MaterialService, CompilerService]
})
export class MaterialModule {}
