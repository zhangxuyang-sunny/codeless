import { HttpException, HttpStatus } from "@nestjs/common";
import { ProjectService } from "src/modules/resource/project.service";

// 检测工程是否存在
export function IsProjectExists() {
  return function (target: ProjectService, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function (projectId: string) {
      if (!(await target.checkProjectExists.call(this, projectId))) {
        const msg = `projectId: '${projectId}' 不存在`;
        this.logger.log(msg);
        throw new HttpException(msg, HttpStatus.OK);
      } else {
        return method.call(this, projectId);
      }
    };
  };
}
