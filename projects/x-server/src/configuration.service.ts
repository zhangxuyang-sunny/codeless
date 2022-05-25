import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  getProjectDBFile() {
    return this.configService.get<string>("PROJECT_DB_FILE");
  }

  getHost() {
    return this.configService.get<string>("HOST");
  }
}
