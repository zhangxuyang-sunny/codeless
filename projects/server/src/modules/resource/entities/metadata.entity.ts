import { ApiProperty } from "@nestjs/swagger";
import { ProjectStatus, ComponentStatus } from "@lowcode/types";
import { IMetaData } from "@lowcode/types";

/**
 * 资源通用元数据信息
 */
export class ResourceMetaData implements IMetaData {
  id: string;
  title: string;
  description: string;
  version: string;
  @ApiProperty({ type: Number })
  status: ProjectStatus | ComponentStatus;
  createdAt: string;
  updatedAt: string;
  createdUser: string;
  updatedUser: string;
}
