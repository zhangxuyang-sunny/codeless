import { Injectable } from "@nestjs/common";
import { bootstrap } from "packages/x-compiler/src/start";

@Injectable()
export class CompilerService {
  async buildVueComponent(entry: string) {
    return bootstrap(entry);
  }
}
