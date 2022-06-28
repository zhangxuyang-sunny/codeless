import { v4 as uuidV4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { CreatePageDTO, QueryPageDTO } from "src/database/modal/page";
import { TablePageService } from "src/database/table.page.service";
import { PageNode } from "packages/x-nodes/index";
import { TableProjectService } from "src/database/table.project.service";

@Injectable()
export class PageService {
  constructor(
    private readonly tbPageService: TablePageService,
    private readonly tbProjectService: TableProjectService
  ) {}

  // 生成 pid，并保证不重复
  private async generateVid() {
    let pageId = uuidV4();
    while (await this.tbPageService.isVidExists(pageId)) {
      pageId = uuidV4();
    }
    return pageId;
  }

  // 创建页面
  // 传入 projectId 用于关联项目
  async createPage({ projectId, title, material }: CreatePageDTO) {
    const pageId = await this.generateVid();
    await this.tbPageService.insertPage({
      pageId,
      version: "0",
      createUser: "",
      updateUser: "",
      schema: new PageNode().setTitle(title).setMaterial(material).getSchema()
    });
    return this.tbProjectService.addPageIdToProject(projectId, pageId);
  }

  // 条件查询页面列表
  async findPagesBy(query: Partial<QueryPageDTO>) {
    return this.tbPageService.findPagesBy(query);
  }

  // 查询多个 pageId 返回列表
  async findPagesByPageIds(ids: string[]) {
    return this.tbPageService.findPagesByPageIds(ids);
  }
}
