import { Module } from "@nestjs/common";
import { CompilerService } from "../compiler/compiler.service";
import { ConfigurationModule } from "../configuration/configuration.module";
import { FileModule } from "../file/file.module";
import { MaterialMarketService } from "./material-market.service";
import { MaterialController } from "./material.controller";
import { MaterialService } from "./material.service";

@Module({
  imports: [ConfigurationModule, FileModule],
  controllers: [MaterialController],
  providers: [CompilerService, MaterialService, MaterialMarketService]
})
export class MaterialModule {}
