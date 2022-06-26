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
  Query
} from "@nestjs/common";
import { CreateProjectDTO, ProjectVO, QueryProjectDTO } from "src/database/modal/project";
import { ProjectService } from "src/services/project.service";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 获取工程列表
  @Get("list")
  async getList(@Headers("uid") uid: string, @Query() query: Partial<QueryProjectDTO>) {
    return this.service.getProjectList(query, uid);
  }

  // 创建工程
  @Post("create")
  @HttpCode(HttpStatus.OK)
  createProject(@Headers("uid") uid: string, @Body() project: CreateProjectDTO) {
    return this.service.createProject(project, uid);
  }

  // 获取工程
  @Get("/query")
  getProject(@Query() query: Partial<QueryProjectDTO>) {
    return this.service.findProjectBy(query);
  }

  // 获取软删除的工程
  @Get("list/unlink")
  getProjectsUnlink(@Headers("uid") uid: string): Promise<ProjectVO[]> {
    return this.service.findUnlinkProjects();
  }

  // 获取等待被彻底移除的工程
  @Get("list/delete")
  getProjectsOnDelete(@Headers("uid") uid: string): Promise<ProjectVO[]> {
    return this.service.findDeleteProjects();
  }

  // 软删除工程
  @Patch("unlink")
  async unlinkProject(@Query("pid") pid: string) {
    return this.service.handleUnlink(pid);
  }
  // 硬删除工程
  @Patch("delete")
  async deleteProject(@Query("pid") pid: string) {
    return this.service.handleDelete(pid);
  }

  // 恢复工程状态
  @Patch("revert")
  revertProject(@Query("pid") pid: string) {
    return this.service.handleRevert(pid);
  }
}
