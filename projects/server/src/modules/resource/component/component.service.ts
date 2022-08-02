import { v4 as uuidV4 } from "uuid";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { database } from "config/database";
import {
  ICreateComponentParams,
  IFindComponentParams,
  IUpdateComponentParams
} from "@lowcode/types";
import { IComponentData } from "@lowcode/types";
import { ComponentStatus } from "@lowcode/types";
import { ComponentDocument, ComponentPO } from "./component.schema";

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(ComponentPO.name, database.db_resource)
    readonly model: Model<ComponentDocument>
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
    return !!(await this.model.exists({ id }));
  }

  // 检查是否存在
  async checkExists(id: string) {
    if (!(await this.isIdExists(id))) {
      throw new HttpException(`'${id}' 不存在`, HttpStatus.BAD_REQUEST);
    }
  }

  async addComponent(view: ComponentPO) {
    return this.model.insertMany(view);
  }

  async findComponent(query: IFindComponentParams): Promise<IComponentData | null> {
    return this.model.findOne(query);
  }

  async findComponents(query: IFindComponentParams): Promise<IComponentData[]> {
    return this.model.find(query);
  }

  async findComponentsByIds(ids: string[]): Promise<IComponentData[]> {
    return this.model.find({ id: { $in: ids } });
  }

  // 创建页面
  // 页面需要关联到应用
  async createComponent(data: ICreateComponentParams) {
    const id = await this.generateId();
    const createdUser = "unknown";
    const result = await this.addComponent({
      id,
      version: "0",
      createdUser,
      updatedUser: createdUser,
      title: data.title,
      description: data.description,
      status: ComponentStatus.updated,
      schema: null
    });
    return result;
  }

  async updateComponent(updateComponentParams: IUpdateComponentParams) {
    const { id, ...updateViewData } = updateComponentParams;
    await this.checkExists(id);
    return this.model.findOneAndUpdate({ id }, updateViewData);
  }
}
