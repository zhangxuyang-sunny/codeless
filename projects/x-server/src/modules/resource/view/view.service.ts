import { v4 as uuidV4 } from "uuid";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { database } from "config/database";
import { MaterialTransformer } from "packages/x-core/src/transformer/MaterialTransformer";
import { IView } from "packages/x-core/src/types/view";
import {
  ICreateViewParams,
  IFindViewsParams,
  IUpdateViewParams
} from "packages/x-core/src/types/view";
import { ViewDocument, ViewPO } from "./view.schema";

@Injectable()
export class ViewService {
  constructor(
    @InjectModel(ViewPO.name, database.db_resource)
    readonly viewModel: Model<ViewDocument>
  ) {}

  // 生成唯一 id
  private async generateId() {
    let id = uuidV4();
    while (await this.isIdExists(id)) {
      id = uuidV4();
    }
    return id;
  }

  // id 是否存在，返回 boolean
  async isIdExists(id: string): Promise<boolean> {
    return !!(await this.viewModel.exists({ id }));
  }

  // 检查是否存在
  async checkViewExists(id: string) {
    if (!(await this.isIdExists(id))) {
      throw new HttpException(`'${id}' 不存在`, HttpStatus.BAD_REQUEST);
    }
  }

  async addView(view: ViewPO) {
    return this.viewModel.insertMany(view);
  }

  async findView(query: IFindViewsParams): Promise<IView | null> {
    return this.viewModel.findOne(query);
  }

  async findViews(query: IFindViewsParams): Promise<IView[]> {
    return this.viewModel.find(query);
  }

  async findViewsByIds(ids: string[]): Promise<IView[]> {
    return this.viewModel.find({ id: { $in: ids } });
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
