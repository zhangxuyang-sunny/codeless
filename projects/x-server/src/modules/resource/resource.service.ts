import { Injectable } from "@nestjs/common";
import { IResourceData } from "packages/x-core/src/types/manager";
import { ProjectService } from "./project/project.service";
import { ComponentService } from "./component/component.service";

@Injectable()
export class ResourceService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly componentService: ComponentService
  ) {}

  async getResource(): Promise<IResourceData> {
    const projects = await this.projectService.findProjects({});
    const components = await this.componentService.findComponents({});
    // const datasets =
    return {
      projects,
      components,
      datasets: []
    };
  }
}
