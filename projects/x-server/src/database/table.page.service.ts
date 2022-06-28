import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "config/database";
import { PageDO, PageDocument } from "./schemas/page.schema";
import { PageVO, QueryPageDTO } from "./modal/page";

@Injectable()
export class TablePageService {
  constructor(
    @InjectModel(PageDO.name, database.db_project)
    private readonly pageModel: Model<PageDocument>
  ) {}

  async isVidExists(pageId: string) {
    return this.pageModel.exists({ pageId });
  }

  async insertPage(page: PageDO) {
    return this.pageModel.insertMany(page);
  }

  async findPageBy(query: Partial<QueryPageDTO>): Promise<PageVO | null> {
    return this.pageModel.findOne(query);
  }

  async findPagesBy(query: Partial<QueryPageDTO>): Promise<PageVO[]> {
    return this.pageModel.find(query);
  }

  async findPagesByPageIds(ids: string[]): Promise<PageVO[]> {
    return this.pageModel.find({ pageId: { $in: ids } });
  }
}
