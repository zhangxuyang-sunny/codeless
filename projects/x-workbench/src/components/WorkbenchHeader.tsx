import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Button, Divider, Select, Space } from "@arco-design/web-react";
import { IconEye, IconHistory, IconLeft, IconSave, IconSend } from "@arco-design/web-react/icon";
import { routerState } from "@/stores/routerSchema";
import { pageSchemasState } from "@/stores/pageSchemaList";
import RouterSetter from "./RouterSetter";

// 工作区顶栏
const WorkbenchHeader: React.FC = () => {
  const routerSchema = useRecoilValue(routerState);
  const pageSchemaList = useRecoilValue(pageSchemasState);
  return (
    <StyleWorkbench>
      <div className="left">
        <Button className="back-button" icon={<IconLeft />} type="text" shape="circle" />
        <Divider type="vertical" />
        {/* <Select size="small">
          {pageSchemaList.map(pageSchema => (
            <Select.Option key={pageSchema.id.value} value={pageSchema.title.value}>
              {pageSchema.title.value}
            </Select.Option>
          ))}
        </Select> */}
        <RouterSetter />
      </div>
      <div className="right">
        <Button icon={<IconSave />} size="small" type="text">
          保存
        </Button>
        <Button icon={<IconHistory />} size="small" type="text">
          历史记录
        </Button>
        <Divider type="vertical" />
        <Space>
          <Button icon={<IconEye />} size="small">
            预览
          </Button>
          <Button icon={<IconSend />} size="small" type="primary">
            发布
          </Button>
        </Space>
      </div>
    </StyleWorkbench>
  );
};

const StyleWorkbench = styled.div`
  width: 100vw;
  height: 40px;
  background-color: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border-2);
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    .back-button {
      flex-shrink: 0;
      color: var(--color-text-1);
    }
  }
  .right {
  }
`;

export default WorkbenchHeader;
