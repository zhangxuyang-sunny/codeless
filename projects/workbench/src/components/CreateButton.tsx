import { Button, Form, Input, Modal, Select } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useToggle } from "ahooks";

const CreateButton: React.FC<{ resName: string }> = props => {
  const [visible, { setLeft, setRight }] = useToggle();
  return (
    <>
      <Button type="primary" icon={<IconPlus />} onClick={setRight}>
        创建{props.resName}
      </Button>
      <Modal
        title={<div style={{ textAlign: "left" }}>创建{props.resName}</div>}
        visible={visible}
        onOk={setLeft}
        onCancel={setLeft}
      >
        <Form>
          <Form.Item label="应用名称">
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item label="应用描述">
            <Input.TextArea placeholder="请输入应用描述" />
          </Form.Item>
          <Form.Item label="共享至团队">
            <Select></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateButton;
