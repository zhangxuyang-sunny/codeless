import styled from "styled-components";
import HeaderButton from "../HeaderButton";

const Create: React.FC = () => {
  const OverlayRender = (
    <CreateOverlayContainer>
      <div className="create-item">
        <div className="title">创建页面</div>
        <div className="description"></div>
      </div>
      <div className="create-item">
        <div className="title">创建项目</div>
        <div className="description"></div>
      </div>
      <div className="create-item">
        <div className="title">创建工作区</div>
        <div className="description"></div>
      </div>
    </CreateOverlayContainer>
  );
  return (
    <HeaderButton type="special" dropProps={{ title: "创建", overlay: OverlayRender }}>
      创建
    </HeaderButton>
  );
};

const CreateOverlayContainer = styled.div``;

export default Create;
