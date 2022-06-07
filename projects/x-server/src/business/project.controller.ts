import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Put,
  Query
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectVO } from "src/data-modal/vo/ProjectVO";
import { CreateProjectDTO } from "src/data-modal/dto/ProjectDTO";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 获取工程列表
  @Get("list")
  getList() {
    return this.service.findNormalProjects();
  }

  // 使用查询条件获取 query
  @Get("list/query")
  queryList(@Query() project: Partial<ProjectVO>) {
    return this.service.findProjectsBy(project);
  }

  // 创建工程
  @Put("create")
  createProject(@Body() project: CreateProjectDTO, @Headers("uid") uid: string) {
    return this.service.createProject(project, uid);
  }

  // 获取软删除的工程
  @Get("list/unlink")
  getProjectsUnlink() {
    return this.service.findUnlinkProjects();
  }

  // 获取等待被彻底移除的工程
  @Get("list/delete")
  getProjectsOnDelete() {
    return this.service.findDeleteProjects();
  }

  // 软删除工程
  @Patch("unlink")
  async unlinkProject(@Query("uuid") uuid: string) {
    const count = await this.service.handleUnlink(uuid);
    if (count === 0) {
      const msg = `uuid: '${uuid}' 不存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    } else {
      return null;
    }
  }
  // 硬删除工程
  @Patch("delete")
  async deleteProject(@Query("uuid") uuid: string) {
    const count = await this.service.handleDelete(uuid);
    if (count === 0) {
      const msg = `uuid: '${uuid}' 不存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    } else {
      return null;
    }
  }

  // 恢复工程状态
  @Patch("revert")
  revertProject(@Query("uuid") uuid: string) {
    return this.service.handleRevert(uuid);
  }
}
