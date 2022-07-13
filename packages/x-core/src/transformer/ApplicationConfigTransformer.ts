import { ApplicationConfig } from "../types/manager";
import {
  ApplicationSchema,
  ComponentSchema,
  DatasetSchema
} from "../types/schemas/application";

/**
 * ApplicationConfig 转换器
 * ApplicationConfig -> ApplicationSchema
 */
export class ApplicationConfigTransformer {
  constructor(private config: ApplicationConfig) {
    if (!config) return this;
    config.resource.datasets.forEach((dataset) => {
      this.datasetMap.set(dataset.id, dataset);
    });
    config.resource.components.forEach((component) => {
      this.componentMap.set(component.id, component);
    });
  }

  private datasetMap: Map<string, DatasetSchema> = new Map();
  private componentMap: Map<string, ComponentSchema> = new Map();

  schema(): ApplicationSchema {
    const pages = this.config.pages.flatMap((page) => {
      const component = this.componentMap.get(page.component.id);
      if (!component) return [];
      return {
        ...page,
        component
      };
    });
    const datasets = this.config.datasets.flatMap((datasetOpt) => {
      const dataset = this.datasetMap.get(datasetOpt.dataset.id);
      if (!dataset) return [];
      return dataset;
    });
    return {
      ...this.config,
      datasets,
      pages
    };
  }
}
