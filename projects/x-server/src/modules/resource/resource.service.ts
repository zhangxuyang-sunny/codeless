import { Injectable } from "@nestjs/common";
import { IResource } from "packages/x-core/src/types/resource";
import { ProjectService } from "./project/project.service";
import { ViewService } from "./view/view.service";

@Injectable()
export class ResourceService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly viewService: ViewService
  ) {}

  async getResource(): Promise<IResource> {
    const projects = await this.projectService.findProjects({});
    const views = await this.viewService.findViews({});
    // const datasets =
    return {
      projects,
      views,
      datasets: []
    };
  }
}
