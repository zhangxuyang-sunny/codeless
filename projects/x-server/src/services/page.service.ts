import { v4 as uuidV4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { CreatePageDTO, QueryPageDTO } from "src/database/modal/page";
import { TablePageService } from "src/database/table.page.service";
import { PageNode } from "packages/x-nodes/index";

@Injectable()
export class PageService {
  constructor(private readonly tbPageService: TablePageService) {}

  // 生成 pid，并保证不重复
  private async generateVid() {
    let vid = uuidV4();
    while (await this.tbPageService.isVidExists(vid)) {
      vid = uuidV4();
    }
    return vid;
  }

  async createPage(createPageDto: CreatePageDTO) {
    this.tbPageService.insertPage({
      vid: await this.generateVid(),
      version: "0",
      title: createPageDto.title,
      createUser: "",
      updateUser: "",
      schema: new PageNode().setMaterial(createPageDto.material).getSchema()
    });
  }

  async findPagesBy(query: Partial<QueryPageDTO>) {
    return this.tbPageService.findPagesBy(query);
  }

  async findPagesByVIds(ids: string[]) {
    return this.tbPageService.findPagesByVIds(ids);
  }
}
