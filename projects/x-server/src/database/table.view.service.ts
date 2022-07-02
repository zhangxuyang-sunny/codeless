import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { ViewSchema, ViewDocument } from "./schemas/view.schema";
import { ViewVO, QueryViewDTO } from "./modal/view";

@Injectable()
export class TableViewService {
  constructor(
    @InjectModel(ViewSchema.name, database.db_resource)
    private readonly pageModel: Model<ViewDocument>
  ) {}

  async isVidExists(pageId: string) {
    return this.pageModel.exists({ pageId });
  }

  async insertPage(page: ViewSchema) {
    return this.pageModel.insertMany(page);
  }

  async findPageBy(query: Partial<QueryViewDTO>): Promise<ViewVO | null> {
    return this.pageModel.findOne(query);
  }

  async findPagesBy(query: Partial<QueryViewDTO>): Promise<ViewVO[]> {
    return this.pageModel.find(query);
  }

  async findPagesByPageIds(ids: string[]): Promise<ViewVO[]> {
    return this.pageModel.find({ pageId: { $in: ids } });
  }
}
