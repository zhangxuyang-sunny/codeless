import React, { useState } from "react";
import styled from "styled-components";
import { useToggle } from "ahooks";
import bg from "src/image/workspace-bg.svg";
import workSpaceSvg from "src/image/workspace-content.svg";
import { Form, Modal, Input, Button } from "@arco-design/web-react";

const ContentContainer = styled.div`
  display: flex;
  min-height: 600px;
  width: calc(100vw - 48px);
  max-width: 1200px;
  overflow: hidden;
  border-radius: 3px;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    width: 475px;
    .right.right {
      min-height: 250px;
      background-position: 40px;
      transform: scaleX(2) rotate(-90deg);
      &::before {
        transform: scaleY(0.5) rotate(90deg);
      }
    }
  }

  .right,
  .left {
  }
  .left {
    flex: 1;
    display: flex;
    .main {
      width: 388px;
      margin: auto;
      h1 {
        color: #091e42;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 28px;
        display: block;
        margin-bottom: 12px;
      }
      p {
        font-size: 18px;
        color: #6b778c;
        margin: 12px auto 24px;
      }
    }
  }
  .right {
    width: 342px;
    flex-shrink: 0;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    &::before {
      content: "";
      width: 200px;
      height: 200px;
      display: block;
      margin: auto;
      background: url(${workSpaceSvg}) no-repeat;
      background-size: contain;
    }
  }
`;

const Content: React.FC = () => {
  const [workSpaceName, setName] = useState("");
  return (
    <ContentContainer>
      <div className="left">
        <div className="main">
          <h1>开始构建工作区吧</h1>
          <p>通过让每个人更容易在一个位置访问看板提高你的生产力。</p>
          <Form layout="vertical">
            <Form.Item label="工作区名称">
              <Input value={workSpaceName} onChange={setName} />
            </Form.Item>
            <Button disabled={!workSpaceName.trim()} className="submit-button" type="primary">
              提交
            </Button>
          </Form>
        </div>
      </div>
      <div className="right"></div>
    </ContentContainer>
  );
};

function useCreateWorkSpace() {
  const [visible, { setLeft, setRight }] = useToggle();
  const [submitLoading, setLoading] = useState(false);

  const handleClose = () => {
    setLoading(false);
    setLeft();
  };

  const submitValue = async () => {
    handleClose();
  };

  const contextHolder = (
    <Modal
      title={null}
      footer={null}
      visible={visible}
      onCancel={handleClose}
      onOk={submitValue}
      confirmLoading={submitLoading}
      unmountOnExit={true}
      className="rebase-modal-content"
    >
      <Content />
    </Modal>
  );
  const openWorkSpaceModel = () => {
    setRight();
  };
  return {
    contextHolder,
    openWorkSpaceModel
  };
}

export default useCreateWorkSpace;
