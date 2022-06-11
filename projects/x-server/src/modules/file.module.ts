import { Module } from "@nestjs/common";
import { FileController } from "src/controllers/file.controller";
import { ConfigurationModule } from "src/modules/configuration.module";
import { FileService } from "src/services/file.service";

@Module({
  imports: [ConfigurationModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
