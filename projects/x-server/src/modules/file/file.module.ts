import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
  imports: [ConfigurationModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
