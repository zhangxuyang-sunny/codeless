import { NodeTypes } from "../enums";
import { AbstractNode } from "../AbstractNode";
import { RouterNode, RouterSchema, RouterValue } from "./RouterNode";
import { PiniaNode, PiniaSchema, PiniaValue } from "./PiniaNode";
import { PageNode, PageSchema, PageValue } from "./PageNode";
import { TypePackages } from "../../x-types";

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
  piniaList: PiniaSchema[];
  pageList: PageSchema[];
}

export interface ProjectValue {
  router: RouterValue;
  piniaList: PiniaValue[];
  pageList: PageValue[];
}

export class ProjectNode extends AbstractNode<NodeTypes.Project> {
  constructor() {
    super(NodeTypes.Project);
  }
  private readonly router = new RouterNode();
  private readonly piniaList: PiniaSchema[] = [];
  private readonly pageList: PageSchema[] = [];

  setPackages(packages: TypePackages) {
    AbstractNode.setPackages(packages);
    return this;
  }

  addPinia(piniaSchema: PiniaSchema) {
    const index = this.piniaList.findIndex(
      (item) => item.key === piniaSchema.key
    );
    if (index >= 0) {
      this.piniaList[index] = piniaSchema;
    } else {
      this.piniaList.push(piniaSchema);
    }
  }

  addPage(pageSchema: PageSchema) {
    const index = this.pageList.findIndex((item) => item.id === pageSchema.id);
    if (index >= 0) {
      this.pageList[index] = pageSchema;
    } else {
      this.pageList.push(pageSchema);
    }
  }

  setSchema(schema: ProjectSchema) {
    this.router.setSchema(schema.router);
    schema.piniaList.forEach((item) => {
      this.addPinia(item);
    });
    schema.pageList.forEach((item) => {
      this.addPage(item);
    });
    return this;
  }

  getSchema(): ProjectSchema {
    return {
      type: this.type,
      router: this.router.getSchema(),
      piniaList: this.piniaList,
      pageList: this.pageList
    };
  }

  getRouter() {
    return this.router.getValue();
  }

  getPiniaList() {
    return this.piniaList.map((item) =>
      new PiniaNode().setSchema(item).getValue()
    );
  }

  getPageList() {
    return this.pageList.map((item) =>
      new PageNode().setSchema(item).getValue()
    );
  }

  getValue(): ProjectValue {
    return {
      router: this.getRouter(),
      piniaList: this.getPiniaList(),
      pageList: this.getPageList()
    };
  }
}

AbstractNode.setParser(ProjectNode);
