import { IApplicationConfig } from "../types/manager";
import {
  IApplicationSchema,
  IComponentSchema,
  IDatasetSchema
} from "../types/schemas/project";

/**
 * ApplicationConfig 转换器
 * ApplicationConfig -> ApplicationSchema
 */
export class ApplicationConfigTransformer {
  constructor(private config: IApplicationConfig) {
    if (!config) return this;
    config.resource.datasets.forEach((dataset) => {
      this.datasetMap.set(dataset.id, dataset);
    });
    config.resource.components.forEach((component) => {
      this.componentMap.set(component.id, component);
    });
  }

  private datasetMap: Map<string, IDatasetSchema> = new Map();
  private componentMap: Map<string, IComponentSchema> = new Map();

  schema(): IApplicationSchema {
    const pages = this.config.config.pages.flatMap((page) => {
      const component = this.componentMap.get(page.component.id);
      if (!component) return [];
      return {
        ...page,
        component
      };
    });
    const datasets = this.config.config.datasets.flatMap((datasetOpt) => {
      const dataset = this.datasetMap.get(datasetOpt.dataset.id);
      if (!dataset) return [];
      return dataset;
    });
    return {
      id: this.config.id,
      ...this.config.config,
      datasets,
      pages
    };
  }
}
