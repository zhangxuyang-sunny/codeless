import { Form, Input, Message, Modal } from "@arco-design/web-react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import { useToggle } from "ahooks";
import { useState } from "react";
// import { createComponent } from "src/api";
import { ExtractPromiseResolve } from "src/typeUtils";

type ResolveValueType = ExtractPromiseResolve<Record<string, unknown>>;

const FormItem = Form.Item;
export default function useCreateView() {
  const [submitResolve, setResolve] = useState<(value: ResolveValueType) => void>();

  const [visible, { setLeft, setRight }] = useToggle();
  const [submitLoading, setLoading] = useState(false);

  const [form] = useForm();

  const handleClose = () => {
    form.clearFields();
    setLoading(false);
    setLeft();
  };

  const submitValue = async () => {
    const params = await form.validate();
    setLoading(true);
    // const res = await createComponent(params);
    // if (res.code === 0) {
    //   Message.success(res.message);
    //   handleClose();
    //   submitResolve?.(res);
    // }
  };

  const contextHolder = (
    <Modal
      title="创建页面"
      visible={visible}
      onCancel={handleClose}
      onOk={submitValue}
      confirmLoading={submitLoading}
      unmountOnExit={true}
    >
      <Form colon={true} form={form}>
        <FormItem label="名称" field="title" rules={[{ required: true, message: "请输入名称" }]}>
          <Input placeholder="请输入"></Input>
        </FormItem>
        <FormItem
          label="描述"
          field="description"
          rules={[{ required: true, message: "请输入描述" }]}
        >
          <Input.TextArea placeholder="请输入"></Input.TextArea>
        </FormItem>
      </Form>
    </Modal>
  );

  const openCreateViewModel = async () => {
    return new Promise<ResolveValueType>(resolve => {
      setRight();
      setResolve(() => resolve);
    });
  };
  return {
    contextHolder,
    openCreateViewModel
  };
}
