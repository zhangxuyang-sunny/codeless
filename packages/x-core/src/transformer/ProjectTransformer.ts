import { IProjectSchema, IRouterOption } from "../types/project";
import { ProjectStatus } from "../enums";
import { DatasetTransformer } from "./DatasetTransformer";

export class ProjectTransformer {
  private id = "";
  private title = "";
  private version = "";
  private status = ProjectStatus.normal;
  private description = "";
  private router: IRouterOption = {
    base: "",
    mode: "hash",
    views: []
  };
  private datasets: DatasetTransformer[] = [];
  constructor(project?: IProjectSchema) {
    if (!project) return this;
    this.id = project.id;
    this.title = project.title;
    this.version = project.version;
    this.status = project.status;
    this.router = project.router;
    this.datasets = project.datasets.map(
      (dataset) => new DatasetTransformer(dataset)
    );
  }

  getSchema() {
    return {
      id: this.id,
      title: this.title,
      version: this.version,
      status: this.status,
      description: this.description,
      router: this.router,
      datasets: this.datasets.map((dataset) => dataset.getSchema())
    };
  }

  getConsumer() {
    return {
      id: this.id,
      title: this.title,
      version: this.version,
      status: this.status,
      description: this.description,
      router: this.router,
      datasets: this.datasets.map((dataset) => dataset.getConsumer())
    };
  }
}
