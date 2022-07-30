import { IResourceData } from "packages/x-core/src/types/manager";
import { ComponentVO } from "../component/component.entity";
import { DatasetVO } from "../dataset/dataset.entity";
import { ProjectConfigVO } from "../project/entities/project.vo.entity";

export class ResourceVO implements IResourceData {
  projects: ProjectConfigVO[];
  datasets: DatasetVO[];
  components: ComponentVO[];
}
