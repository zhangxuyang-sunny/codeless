import { Injectable } from "@nestjs/common";
import { ResourceData } from "packages/x-core/src/types/manager";
import { ProjectService } from "./project/project.service";
import { ViewService } from "./view/view.service";

@Injectable()
export class ResourceService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly viewService: ViewService
  ) {}

  async getResource(): Promise<ResourceData> {
    const projects = await this.projectService.findProjects({});
    const pages = await this.viewService.findViews({});
    // const datasets =
    return {
      projects,
      pages,
      datasets: []
    };
  }
}
