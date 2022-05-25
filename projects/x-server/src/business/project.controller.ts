import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Put,
  Query
} from "@nestjs/common";
import { ProjectService, ProjectStatus, ProjectVO } from "./project.service";
import { ProjectSchema } from "packages/x-nodes";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 获取工程列表
  @Get("list")
  getList() {
    return this.service.getNormalList();
  }

  // 使用查询条件获取 query
  @Get("list/query")
  queryList(@Query() project: Partial<ProjectVO>) {
    return this.service.findListByQuery(project);
  }

  // 创建工程
  @Put("create")
  createProject(@Body() project: ProjectSchema) {
    return this.service.create(project);
  }

  // 获取软删除的工程
  @Get("list/unlink")
  getProjectsUnlink() {
    return this.service.findListByQuery({ status: ProjectStatus.unlink });
  }

  // 获取等待被彻底移除的工程
  @Get("list/delete")
  getProjectsOnDelete() {
    return this.service.findListByQuery({ status: ProjectStatus.delete });
  }

  // 软删除工程
  @Patch("unlink")
  async unlinkProject(@Query("uuid") uuid: string) {
    const count = await this.service.unlinkProject(uuid);
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
    const count = await this.service.deleteProject(uuid);
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
    return this.service.revertProject(uuid);
  }
}
