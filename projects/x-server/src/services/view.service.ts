import { v4 as uuidV4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { CreateViewDTO, QueryViewDTO } from "src/database/modal/view";
import { TableViewService } from "src/database/table.view.service";
import { TableProjectService } from "src/database/table.project.service";

@Injectable()
export class ViewService {
  constructor(
    private readonly tbViewService: TableViewService,
    private readonly tbProjectService: TableProjectService
  ) {}

  // 生成唯一 id
  private async generateId() {
    let pageId = uuidV4();
    while (await this.tbViewService.isVidExists(pageId)) {
      pageId = uuidV4();
    }
    return pageId;
  }

  // 创建页面
  // 页面需要关联到应用
  async createView(data: CreateViewDTO) {
    const viewId = await this.generateId();
    await this.tbViewService.insertPage({
      id: viewId,
      version: "0",
      createUser: "",
      updateUser: "",
      title: data.title,
      description: data.description,
      schema: data.material
    });
    return this.tbProjectService.addViewIdToProject(data.appId, viewId);
  }

  // 条件查询
  async findViewsBy(query: Partial<QueryViewDTO>) {
    return this.tbViewService.findPagesBy(query);
  }

  // 查询多个 id 返回列表
  async findViewsBatch(ids: string[]) {
    return this.tbViewService.findPagesByPageIds(ids);
  }
}
