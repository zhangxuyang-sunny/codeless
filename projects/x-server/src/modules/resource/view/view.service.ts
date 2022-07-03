import { v4 as uuidV4 } from "uuid";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MaterialTransformer } from "packages/x-core/src/transformer/MaterialTransformer";
import { TableViewService } from "./view.table.service";
import { TableProjectService } from "../project/project.table.service";
import {
  ICreateViewParams,
  IFindViewsParams,
  IUpdateViewParams
} from "packages/x-core/src/types/view";

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

  // 检查是否存在
  private async checkViewExists(id: string) {
    if (!(await this.tbProjectService.isIdExists(id))) {
      throw new HttpException(`'${id}' 不存在`, HttpStatus.BAD_REQUEST);
    }
  }

  // 创建页面
  // 页面需要关联到应用
  async createView(data: ICreateViewParams) {
    const viewId = await this.generateId();
    const createdUser = "unknown";
    const result = await this.tbViewService.addView({
      id: viewId,
      version: "0",
      createdUser: createdUser,
      updatedUser: createdUser,
      title: data.title,
      description: data.description,
      schema: new MaterialTransformer().getSchema()
    });
    return result;
  }

  async updateView(updateViewParams: IUpdateViewParams) {
    const { id, ...updateViewData } = updateViewParams;
    await this.checkViewExists(id);
    return this.tbViewService.pageModel.findOneAndUpdate({ id }, updateViewData);
  }

  // 条件查询
  async findViews(query: IFindViewsParams) {
    return this.tbViewService.findViews(query);
  }

  // 查询多个 id 返回列表
  async findViewsByIds(ids: string[]) {
    return this.tbViewService.findViewsByIds(ids);
  }
}
