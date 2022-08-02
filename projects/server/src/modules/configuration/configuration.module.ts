import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigurationService } from "./configuration.service";

@Module({
  providers: [ConfigService, ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
