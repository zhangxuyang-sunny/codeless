import { Module } from "@nestjs/common";
import { ConfigurationModule } from "src/modules/configuration.module";
import { FileModule } from "src/modules/file.module";
import { CompilerService } from "src/services/compiler.service";
import { MaterialService } from "src/services/material.service";
import { MaterialController } from "src/controllers/material.controller";

@Module({
  imports: [FileModule, ConfigurationModule],
  controllers: [MaterialController],
  providers: [MaterialService, CompilerService]
})
export class MaterialModule {}
