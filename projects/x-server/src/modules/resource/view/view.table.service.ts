import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { ViewDocument, ViewPO } from "./view.schema";
import { FindViewsDTO, ViewVO } from "./view.modal";

@Injectable()
export class TableViewService {
  constructor(
    @InjectModel(ViewPO.name, database.db_resource)
    readonly pageModel: Model<ViewDocument>
  ) {}

  async isVidExists(pageId: string) {
    return this.pageModel.exists({ pageId });
  }

  async addView(page: ViewPO) {
    return this.pageModel.insertMany(page);
  }

  async findView(query: Partial<FindViewsDTO>): Promise<ViewVO | null> {
    return this.pageModel.findOne(query);
  }

  async findViews(query: Partial<FindViewsDTO>): Promise<ViewVO[]> {
    return this.pageModel.find(query);
  }

  async findViewsByIds(ids: string[]): Promise<ViewVO[]> {
    return this.pageModel.find({ pageId: { $in: ids } });
  }
}
