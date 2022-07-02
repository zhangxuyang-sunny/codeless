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
import { CreateProjectDTO, QueryProjectDTO } from "src/database/modal/project";
import { UpdateViewsDTO } from "src/database/modal/view";
import { ProjectService } from "src/services/project.service";

@Controller("project")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(private readonly service: ProjectService) {}

  // 查询应用列表
  @Get("list")
  async getList(@Headers("uid") uid: string, @Query() query: Partial<QueryProjectDTO>) {
    return this.service.getProjectList(query, uid);
  }

  // 创建应用
  @Post("create")
  @HttpCode(HttpStatus.OK)
  async createProject(@Headers("uid") uid: string, @Body() project: CreateProjectDTO) {
    return this.service.createProject(project, uid);
  }

  // 更新路由页面配置
  @Patch("views/update")
  async updateViews(@Body() { appId, viewOptions }: UpdateViewsDTO) {
    return this.service.updateViewOptions(appId, viewOptions);
  }

  // 恢复工程状态
  @Patch("revert")
  revertProject(@Query("id") id: string) {
    return this.service.handleRevert(id);
  }
}
