import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Space } from "@arco-design/web-react";
import styled from "styled-components";

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <StyledIndex className="home">
      <h1 className="title">Welcome!</h1>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            router.push("/workbench");
          }}
        >
          编辑器
        </Button>
        <Button
          onClick={() => {
            router.push("/workbench/preview");
          }}
        >
          渲染器
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
