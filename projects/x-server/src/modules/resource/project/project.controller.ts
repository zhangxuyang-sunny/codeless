import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { ProjectExistsGuard } from "./project.guard";
import { CreateProjectDTO, FindProjectDTO, UpdateProjectDTO } from "./project.modal";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  @Get("list")
  async getList(@Query() query: FindProjectDTO) {
    return this.service.findProjects(query);
  }

  @Post("create")
  @HttpCode(HttpStatus.OK)
  async createProject(@Headers("uid") uid: string, @Body() project: CreateProjectDTO) {
    return this.service.createProject(project, uid);
  }

  @Patch("update")
  async updateProject(@Body() project: UpdateProjectDTO) {
    return this.service.updateProject(project);
  }

  @Patch("unlink")
  @UseGuards(ProjectExistsGuard)
  async unlinkProject(@Query("id") id: string) {
    return this.service.handleUnlink(id);
  }

  @Patch("revert")
  revertProject(@Query("id") id: string) {
    return this.service.handleRevert(id);
  }
}
