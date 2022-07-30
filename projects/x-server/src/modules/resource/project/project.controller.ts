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
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProjectExistsGuard } from "./project.guard";
import { ProjectService } from "./project.service";
import { CreateProjectDTO } from "./entities/create-project.dto";
import { FindProjectDTO } from "./entities/find-projects.dto";
import { UpdateProjectDTO } from "./entities/update-project.dto";
import { UpdatePagesDTO } from "./entities/update-pages.dto";
import { ProjectConfigVO } from "./entities/project.vo.entity";

@ApiTags("Projects")
@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 通过 id 获取 project
  @Get("/")
  @ApiOkResponse({ type: ProjectConfigVO })
  async getProjectByIdParam(@Query("id") id: string) {
    return this.service.findProject({ id });
  }

  @Get("list")
  @ApiOkResponse({ type: [ProjectConfigVO] })
  async getList(@Query() query: FindProjectDTO) {
    return this.service.findProjects(query);
  }

  @Post("create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectConfigVO })
  async createProject(@Headers("uid") uid: string, @Body() project: CreateProjectDTO) {
    return this.service.createProject(project, uid);
  }

  @Patch("update")
  @ApiOkResponse({ type: ProjectConfigVO })
  async updateProject(@Body() project: UpdateProjectDTO) {
    return this.service.updateProject(project);
  }

  @Patch("unlink")
  @UseGuards(ProjectExistsGuard)
  @ApiOkResponse({ type: Boolean })
  async unlinkProject(@Query("id") id: string) {
    return this.service.handleUnlink(id);
  }

  @Patch("revert")
  @ApiOkResponse({ type: Boolean })
  revertProject(@Query("id") id: string) {
    return this.service.handleRevert(id);
  }

  @Patch("update-pages")
  @ApiOkResponse({ type: ProjectConfigVO })
  updatePages(@Body() updatePagesDto: UpdatePagesDTO) {
    const { id, pages } = updatePagesDto;
    return this.service.updatePages(id, pages);
  }
}
