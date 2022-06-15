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
import { CreateProjectDTO, QueryProjectDTO } from "src/database/modal/project";
import { ProjectService } from "src/services/project.service";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 获取工程列表
  @Get("list")
  async getList(@Query() query: Partial<QueryProjectDTO>, @Headers("id") id: string) {
    return this.service.getProjectList(query, id);
  }

  // // 使用查询条件获取 query
  // @Get("list/query")
  // queryList(@Query() query: Partial<QueryProjectDTO>, @Headers("id") id: string) {
  //   const userPlatform = this.userService.getUserPlatformVOByUsernameLike(id);
  //   if (!userPlatform) {
  //     return;
  //   }
  //   return this.service.findProjectsBy(query);
  // }

  // 创建工程
  @Put("create")
  createProject(@Body() project: CreateProjectDTO, @Headers("id") id: string) {
    return this.service.createProject(project, id);
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
  async unlinkProject(@Query("pid") pid: string) {
    const result = await this.service.handleUnlink(pid);
    if (!result) {
      const msg = `pid: '${pid}' 不存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    } else {
      return "成功";
    }
  }
  // 硬删除工程
  @Patch("delete")
  async deleteProject(@Query("uuid") uuid: string) {
    const result = await this.service.handleDelete(uuid);
    if (!result) {
      const msg = `uuid: '${uuid}' 不存在`;
      this.logger.log(msg);
      throw new HttpException(msg, HttpStatus.OK);
    } else {
      return "成功";
    }
  }

  // 恢复工程状态
  @Patch("revert")
  revertProject(@Query("uuid") uuid: string) {
    return this.service.handleRevert(uuid);
  }
}
