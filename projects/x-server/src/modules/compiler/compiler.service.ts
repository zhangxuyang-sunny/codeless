import { Injectable } from "@nestjs/common";
import { build } from "packages/x-compiler/src/build";
import { ConfigurationService } from "../configuration/configuration.service";

interface CompilerOptions {
  root: string;
  version: string;
}

@Injectable()
export class CompilerService {
  constructor(private readonly configService: ConfigurationService) {}
  async buildVueComponent(options: CompilerOptions) {
    return build({
      cwd: options.root,
      version: options.version
    });
  }
}
