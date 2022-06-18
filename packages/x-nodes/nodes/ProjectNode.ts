import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { PageNode, PageSchema, PageValue } from "./PageNode";
import { RouterNode, RouterSchema, RouterValue } from "./RouterNode";
import { DatasetNode, DatasetSchema, DatasetValue } from "./DatasetNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Project]: {
      schema: ProjectSchema;
      value: ProjectValue;
    };
  }
}

export interface ProjectSchema {
  type: NodeTypes.Project;
  router: RouterSchema;
  datasets: DatasetSchema[];
  pages: PageSchema[];
}

export interface ProjectValue {
  router: RouterValue;
  datasets: DatasetValue[];
  pages: PageValue[];
}

export class ProjectNode extends AbstractNode<NodeTypes.Project> {
  constructor() {
    super(NodeTypes.Project);
  }
  private readonly router = new RouterNode();
  private readonly datasetList: DatasetNode[] = [];
  private readonly pageList: PageNode[] = [];

  setPackages<T extends Record<string, unknown>>(packages: T) {
    Object.entries(packages).forEach(([key, pkg]) => {
      AbstractNode.setPackage(key, pkg);
    });
    return this;
  }

  addDatasetBySchema(datasetSchema: DatasetSchema) {
    const index = this.datasetList.findIndex(
      (item) => item.getSchema().key === datasetSchema.key
    );
    const datasetNode = new DatasetNode().setSchema(datasetSchema);
    if (index >= 0) {
      this.datasetList[index] = datasetNode;
    } else {
      this.datasetList.push(datasetNode);
    }
  }

  addPageBySchema(pageSchema: PageSchema) {
    const index = this.pageList.findIndex(
      (item) => item.getSchema().id === pageSchema.id
    );
    const pageNode = new PageNode().setSchema(pageSchema);
    if (index >= 0) {
      this.pageList[index] = pageNode;
    } else {
      this.pageList.push(pageNode);
    }
  }

  setSchema(schema: ProjectSchema) {
    this.router.setSchema(schema.router);
    schema.datasets.forEach((item) => {
      this.addDatasetBySchema(item);
    });
    schema.pages.forEach((item) => {
      this.addPageBySchema(item);
    });
    return this;
  }

  getSchema(): ProjectSchema {
    return {
      type: this.type,
      router: this.router.getSchema(),
      datasets: this.datasetList.map((item) => item.getSchema()),
      pages: this.pageList.map((item) => item.getSchema())
    };
  }

  getRouter(): RouterValue {
    return this.router.getValue();
  }

  getDatasetList(): DatasetValue[] {
    return this.datasetList.map((item) => item.getValue());
  }

  getPageList(): PageValue[] {
    return this.pageList.map((item) => item.getValue());
  }

  getValue(): ProjectValue {
    return {
      router: this.getRouter(),
      datasets: this.getDatasetList(),
      pages: this.getPageList()
    };
  }
}

AbstractNode.setParser(ProjectNode);
