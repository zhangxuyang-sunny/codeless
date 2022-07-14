import styled from "styled-components";
import { IconCodeSquare } from "@arco-design/web-react/icon";
import useCreateProject from "src/hooks/useCreateProject";
import useCreateView from "src/hooks/useCreateView";
import useCreateWorkSpace from "src/hooks/useCreateWorkSpace";
import HeaderButton from "../HeaderButton";

const Create: React.FC = () => {
  const { openCreateViewModel, contextHolder } = useCreateView();
  const { openWorkSpaceModel, contextHolder: createWorkSpaceCtxHolder } = useCreateWorkSpace();
  const { openCreateProject, contextHolder: createProjectCtxHolder } = useCreateProject();
  const createList = [
    {
      title: "创建页面",
      icon: <IconCodeSquare />,
      handleClick: () => {
        openCreateViewModel();
      }
    },
    {
      title: "创建项目",
      icon: <IconCodeSquare />,
      handleClick: () => {
        openCreateProject();
      }
    },
    {
      title: "创建工作区",
      icon: <IconCodeSquare />,
      handleClick: () => {
        openWorkSpaceModel();
      }
    }
  ];
  const OverlayRender = (
    <CreateOverlayContainer>
      {[contextHolder, createWorkSpaceCtxHolder, createProjectCtxHolder]}
      {createList.map(c => {
        return (
          <div className="create-item hover-bg" onClick={c.handleClick} key={c.title}>
            {c.icon}
            <div className="title">{c.title}</div>
            <div className="description"></div>
          </div>
        );
      })}
    </CreateOverlayContainer>
  );
  return (
    <HeaderButton type="special" dropProps={{ title: "创建", overlay: OverlayRender }}>
      创建
    </HeaderButton>
  );
};

const CreateOverlayContainer = styled.div`
  .create-item {
    display: flex;
    align-items: center;
    min-height: 35px;
    border-radius: 3px;
    padding: 0 6px;
    margin-top: 4px;
    .arco-icon {
      margin-right: 10px;
    }
  }
`;

export default Create;
