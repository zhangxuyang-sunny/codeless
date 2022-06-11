import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigurationService } from "src/services/configuration.service";

@Module({
  providers: [ConfigService, ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
