import { Button } from "@arco-design/web-react";
import styled from "styled-components";

import LayoutCenter from "../../components/LayoutCenter";
import LeftLayout from "../../components/LayoutLeft";
import RightLayout from "../../components/LayoutRight";

const StyleHomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyleHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--color-border-1);
  .block-item {
    flex-shrink: 0;
  }
  .btn {
    margin-left: 10px;
  }
`;

const StyleContentContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
  /* width: 100%;
  height: 100%; */
  /* box-sizing: border-box; */
`;

export const Home: React.FC = () => {
  return (
    <StyleHomeLayout>
      <StyleHeaderContainer>
        <div className="block-item">Designer</div>
        <div className="block-item">
          <Button className="btn">预览</Button>
          <Button type="primary" className="btn">
            发布
          </Button>
        </div>
      </StyleHeaderContainer>
      <StyleContentContainer>
        <LeftLayout />
        <LayoutCenter />
        <RightLayout />
      </StyleContentContainer>
    </StyleHomeLayout>
  );
};
