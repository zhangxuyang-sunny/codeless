import { Injectable } from "@nestjs/common";
import { ResourceData } from "packages/x-core/src/types/manager";
import { ProjectService } from "./projects/project.service";
import { ComponentService } from "./components/component.service";

@Injectable()
export class ResourceService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly viewService: ComponentService
  ) {}

  async getResource(): Promise<ResourceData> {
    const projects = await this.projectService.findProjects({});
    const components = await this.viewService.findComponents({});
    // const datasets =
    return {
      projects,
      components,
      datasets: []
    };
  }
}
