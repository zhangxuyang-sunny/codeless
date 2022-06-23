import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
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
}

export interface ProjectValue {
  router: RouterValue;
  datasets: DatasetValue[];
}

export class ProjectNode extends AbstractNode<NodeTypes.Project> {
  constructor() {
    super(NodeTypes.Project);
  }
  static readonly type = NodeTypes.Project;
  private readonly router = new RouterNode();
  private readonly datasetList: DatasetNode[] = [];

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

  setSchema(schema: ProjectSchema) {
    this.router.setSchema(schema.router);
    schema.datasets.forEach((item) => {
      this.addDatasetBySchema(item);
    });
    return this;
  }

  getSchema(): ProjectSchema {
    return {
      type: this.type,
      router: this.router.getSchema(),
      datasets: this.datasetList.map((item) => item.getSchema())
    };
  }

  getRouter(): RouterValue {
    return this.router.getValue();
  }

  getDatasetList(): DatasetValue[] {
    return this.datasetList.map((item) => item.getValue());
  }

  getValue(): ProjectValue {
    return {
      router: this.getRouter(),
      datasets: this.getDatasetList()
    };
  }
}

AbstractNode.setParser(ProjectNode);
