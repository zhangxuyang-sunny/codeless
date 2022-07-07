import { Request } from "express";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ProjectService } from "./project.service";

export class ProjectExistsGuard implements CanActivate {
  constructor(private projectService: ProjectService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.query);
    return true;
  }
}
