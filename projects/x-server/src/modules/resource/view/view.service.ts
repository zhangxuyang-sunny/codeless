import { v4 as uuidV4 } from "uuid";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { database } from "config/database";
import { MaterialTransformer } from "packages/x-core/src/transformer/MaterialTransformer";
import {
  ICreateViewParams,
  IFindViewsParams,
  IUpdateViewParams
} from "packages/x-core/src/types/view";
import { ProjectService } from "../project/project.service";
import { ViewDocument, ViewPO } from "./view.schema";

@Injectable()
export class ViewService {
  constructor(
    @InjectModel(ViewPO.name, database.db_resource)
    readonly viewModel: Model<ViewDocument>,
    private readonly projectService: ProjectService
  ) {}

  // 生成唯一 id
  private async generateId() {
    let pageId = uuidV4();
    while (await this.isIdExists(pageId)) {
      pageId = uuidV4();
    }
    return pageId;
  }

  async isIdExists(pageId: string) {
    return this.viewModel.exists({ pageId });
  }

  // 检查是否存在
  async checkViewExists(id: string) {
    if (!(await this.isIdExists(id))) {
      throw new HttpException(`'${id}' 不存在`, HttpStatus.BAD_REQUEST);
    }
  }

  async addView(page: ViewPO) {
    return this.viewModel.insertMany(page);
  }

  async findView(query: IFindViewsParams): Promise<ViewPO | null> {
    return this.viewModel.findOne(query);
  }

  async findViews(query: Partial<IFindViewsParams>): Promise<ViewPO[]> {
    return this.viewModel.find(query);
  }

  async findViewsByIds(ids: string[]): Promise<ViewPO[]> {
    return this.viewModel.find({ pageId: { $in: ids } });
  }

  // 创建页面
  // 页面需要关联到应用
  async createView(data: ICreateViewParams) {
    const viewId = await this.generateId();
    const createdUser = "unknown";
    const result = await this.addView({
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
    return this.viewModel.findOneAndUpdate({ id }, updateViewData);
  }
}
