import { Button, Space } from "@arco-design/web-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Index: React.FC = () => {
  return (
    <StyledIndex className="home">
      <h1 className="title">Welcome!</h1>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            // router.push("/workbench");
          }}
        >
          <Link to="/workbench">编辑器</Link>
        </Button>
        <Button
          onClick={() => {
            // router.push("/workbench/preview");
          }}
        >
          <Link to="/workbench/preview">渲染器</Link>
        </Button>
      </Space>
    </StyledIndex>
  );
};

const StyledIndex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .title {
    font-size: 50px;
  }
`;

export default Index;
