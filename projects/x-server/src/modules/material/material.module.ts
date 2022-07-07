import { Module } from "@nestjs/common";
import { CompilerService } from "../compiler/compiler.service";
import { ConfigurationModule } from "../configuration/configuration.module";
import { FileModule } from "../file/file.module";
import { MaterialController } from "./material.controller";
import { MaterialService } from "./material.service";

@Module({
  imports: [ConfigurationModule, FileModule],
  controllers: [MaterialController],
  providers: [MaterialService, CompilerService]
})
export class MaterialModule {}
